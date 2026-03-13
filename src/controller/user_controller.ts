import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { user } from "../models/user_model";
import { Books } from "../models/book_model";
import { issuedBooks } from "../models/issuedBooks_model";
import { Op } from "sequelize";
import { errorHandler } from "../utils/errorHandler";

// gettalluser
export const getAlluser = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10,
            // issuedbooks,
            search,
            sort_by = 'createdAt',
            order = 'DESC'
        } = req.query;

        // console.log('search value',search);
        // columns for sorting
        const columnsAllowedForSorting = ['full_name', 'email', 'mobile', 'gender'];

        // validate sortby columns
        const safeSortBy = columnsAllowedForSorting.includes(sort_by as string)
            ? sort_by
            : 'createdAt'; // Default if invalid

        //validate order
        const safeOrder = ['ASC', 'DESC'].includes((order as string).toUpperCase())
            ? (order as string).toUpperCase()
            : 'DESC';


        // pagination code
        const offset = (Number(page) - 1) * Number(limit);

        const whereClause: any = {};

        // search filtering code
        if (search) {
            whereClause[Op.or] = [
                { full_name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                {user_id: { [Op.like]: `%${search}%`}},
                {mobile: { [Op.like]: `%${search}%`}},
                {birthdate: { [Op.like]: `%${search}%`}},
            ];
        }

        // const includeClause: any[] = [
        //     {
        //         model: Books,
        //         as: "books",
        //         attributes: ['name'],
        //         through: { attributes: [] },
        //         where: issuedbooks ? { name: { [Op.like]: `%${issuedbooks}%` } } : {},
        //         required: issuedbooks ? true : false,
        //     }
        // ];

        const { count, rows } = await user.findAndCountAll({
            where: whereClause,
            // include: includeClause,
            distinct: true,
            limit: Number(limit),
            offset: offset,
            order: [[safeSortBy as string, safeOrder as string]],
        });

        if (count === 0) {
            return res.status(404).json({
                success: false,
                message: "No user found",
            });
        }

        return res.status(200).json({
            success: true,
            pagination: {
                totalItems: count,
                totalPages: Math.ceil(count / Number(limit)),
                currentPage: Number(page),
            },
            data: rows,
        });


        // const allUsers = await user.findAll()
        // return res.status(200).json({
        //     success: true,
        //     data: allUsers,
        // })
    } catch (error) {
        // return res.status(404).json({
        //     succee: false,
        //     message: 'failed to fetch users',
        //     error,
        // })
        errorHandler(res,error,404,"failed to fetch users")
    }
}

// get users detail 
export const userdetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const userDetail = await user.findByPk(id as string);
        return res.status(200).json({
            success: true,
            message: "user fetched successfully",
            data: userDetail,
        })
    } catch (error) {
        // return res.status(404).json({
        //     succee: false,
        //     message: 'failed to fetch user',
        //     error,
        // })
        errorHandler(res,error,404,"failed to fetch user")
    }
}

// create new user 
export const createNewUser = async (req: Request, res: Response) => {
    try {
        const { full_name, email, password, mobile, gender, birthdate } = req.body;

        if (!full_name || !email || !password || !gender || !birthdate) {
            return res.status(400).json({
                success: false,
                message: "required fields are empty",
            })
        }

        const findUser = await user.findOne({ where: { email: email } })
        if (findUser) {
            return res.status(400).json({
                success: false,
                message: "user with this email already exists",
            })
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const createUser = await user.create({
            full_name,
            email,
            password: hashedpassword,
            mobile,
            gender,
            birthdate,
        });
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: createUser,
        })
    } catch (error) {
        // return res.status(500).json({
        //     succee: false,
        //     message: 'failed to create user',
        //     error,
        // })
        errorHandler(res,error,500,"failed to create user")
    }
}

// update user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const finduser = await user.findByPk(id as string)
        if (!finduser) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        await finduser.update(req.body);
        return res.status(200).json({
            success: true,
            message: "user updated successfully",
            data: finduser,
        })
    } catch (error) {
        // return res.status(500).json({
        //     succee: false,
        //     message: 'failed to update user',
        //     error,
        // })
        errorHandler(res,error,500,"failed to update user")
    }

}

// delete user
export const deleteuser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const finduser = await user.findByPk(id as string)
        if (!finduser) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        await finduser.destroy()
        return res.status(201).json({
            success: true,
            message: "user deleted successfully",
        })
    } catch (error) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to delete user",
        //     error,
        // });
        errorHandler(res,error,500,"failed to delete users")
    }

}

// issued books to the user 
export const checkissuedBook = async (req: Request, res: Response) => {
    try {
        // const { user_id } = req.params;
        const user_id = req.user.id;
        // console.log("user-id:", user_id);

        const { book_id } = req.body;

        // check quantity of book before issuing new one 
        const checkBookQuantity: any = await Books.findOne({ where: { id: book_id, deleted_at: null } } as any)
        // console.log("quantity", checkBookQuantity)
        if (!checkBookQuantity || checkBookQuantity.quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Book is currently unavailable",
            })
        }

        const alredyHasBook = await issuedBooks.findOne({
            where: {
                user_id: user_id,
                book_id: book_id,
                return_date: null
            }
        } as any)

        if (alredyHasBook) {
            return res.status(400).json({
                success: false,
                message: "You already have an active issue for this book. Return it first.",
            });
        }

        // check how many books do user have 
        const userissuedBook: any = await issuedBooks.count({ where: { user_id: user_id, return_date: null } as any })
        if (userissuedBook >= 3) {
            return res.status(400).json({ message: "Maximum limit of 3 books reached." });
        }
        await issuedBooks.create({ user_id: user_id, book_id: book_id, issued_date: Date.now() })

        // decrement the quantity
        await checkBookQuantity.decrement('quantity', { by: 1 });
        return res.status(201).json({
            success: true,
            message: "book is issued to user",
        })
    } catch (error) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to issue book",
        //     error,
        // })
        errorHandler(res,error,500,"failed to issue book")
    }
}

// check how many books issued to particular user
// export const issuedbooks = async (req: Request, res: Response) => {
//     try {
//         const {user_id} = req.params

//         const userissuedBook = await issuedBooks.count({ where: { user_id: user_id } })
//         return res.status(200).json({
//             success:true,
//             message:"books fetched successfully",
//             data:userissuedBook,
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message:"faild to fetch books",
//             error,
//         })
//     }

// }

// user return a book 
export const returnBook = async (req: Request, res: Response) => {
    try {
        // const { user_id } = req.params;
        const user_id = req.user.id;
        // console.log("user_id", user_id);
        const { book_id } = req.body;

        const checkBookQuantity: any = await Books.findOne({ where: { id: book_id, deleted_at: null } } as any)
        const findenteries = await issuedBooks.findOne({
            where: {
                user_id: user_id,
                book_id: book_id,
            }
        })
        if (!findenteries) {
            return res.status(401).json({
                success: false,
                message: "book or user not found",
                data: findenteries,
            })
        }
        const returndate = await issuedBooks.update({ return_date: Date.now() }, {
            where:
            {
                user_id: user_id,
                book_id: book_id,
            }
        })
        // increment the quantity of the book 
        await checkBookQuantity.increment('quantity', { by: 1 })
        return res.status(201).json({
            success: true,
            message: "book returned successfully",
            data: returndate,
        })
    } catch (error) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to return book",
        //     error,
        // })
        errorHandler(res,error,500,"failed to return book")
    }
}

// admin can see the record of issued and returned book of user
export const userDetails = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        // const user_id = req.user.id

        const userHistory = await issuedBooks.findAll({
            where: { user_id: user_id },
            include: [{
                model: Books,
                attributes: ['title', 'authorname']
            }],
            attributes: ['issued_date', 'return_date'],
            order: [['issued_date', 'DESC']]
        })

        if (userHistory.length > 0) {
            return res.status(200).json({
                success: true,
                message: "user history found",
                data: userHistory,
            })
        } else {
            res.status(404).json({ message: 'No book history found for this user.' });
        }

    } catch (error) {
        // return res.status(500).json({
        //     success: false,
        //     message: 'Error retrieving book history',
        //     error,
        // });
        errorHandler(res,error,500,"Error retrieving book history")
    }
}

// user can see its own record 
export const userPersonalRecord = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            sort_by = 'createdAt',
            order = 'DESC'
        } = req.query;

        const userid = req.user.id;
        const offset = (Number(page) - 1) * Number(limit);

        // Filter by the logged-in user
        const whereClause: any = { user_id: userid };

        const includeClause: any[] = [
            {
                model: Books,
                attributes: ['title', 'authorname'],
                where: search ? {
                    [Op.or]: [
                        { title: { [Op.like]: `%${search}%` } },
                        { authorname: { [Op.like]: `%${search}%` } }
                    ]
                } : {},
                required: search ? true : false,
            }
        ];

        const { count, rows } = await issuedBooks.findAndCountAll({
            where: whereClause,
            include: includeClause,
            distinct: true,
            limit: Number(limit),
            offset: offset,
            order: [[sort_by as string, order as string]],
        });

        if (count === 0) {
            return res.status(404).json({
                success: false,
                message: "No records found",
            });
        }

        return res.status(200).json({
            success: true,
            pagination: {
                totalItems: count,
                totalPages: Math.ceil(count / Number(limit)),
                currentPage: Number(page),
            },
            data: rows,
        });

        // const userid = req.user.id;
        // const allUsers = await user.findAll(userid)
        // return res.status(200).json({
        //     success: true,
        //     data: allUsers,
        // })
    } catch (error) {
        // return res.status(500).json({
        //     succee: false,
        //     message: 'failed to fetch users details',
        //     error,
        // })
         errorHandler(res,error,500,"failed to fetch users details")
    }
}
