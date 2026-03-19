import { Request, Response } from "express";
import { Books } from "../models/book_model";
import { Op } from "sequelize";
import { errorHandler } from "../utils/errorHandler";
import cloudinary from "../utils/cloudinary"
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// to get all books
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            sort_by = 'createdAt',
            order = 'DESC'
        } = req.query;

        // console.log('search value',search);

        const columnsAllowedForSorting = ['title', 'authorname', 'quantity'];
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
                { title: { [Op.like]: `%${search}%` } },
                { authorname: { [Op.like]: `%${search}%` } },
                { id: { [Op.like]: `%${search}%` } },
                { quantity: { [Op.like]: `%${search}%` } },
            ];
        }

        const { count, rows } = await Books.findAndCountAll({
            where: whereClause,
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
        // const getBooks = await Books.findAll();
        // return res.status(200).json({
        //     success: true,
        //     message: "user gets successfully",
        //     data: getBooks,
        // })
    } catch (error) {
        // return res.status(404).json({
        //     succee: false,
        //     message: 'failed to fetch books',
        //     error,
        // })
        errorHandler(res, error, 404, "failed to fetch books")
    }

}

// get single book
export const getSinglebook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const getbookdetail = await Books.findByPk(id as string)
        return res.status(200).json({
            success: true,
            message: "book fetched successfully",
            data: getbookdetail,
        })
    } catch (error) {
        // return res.status(404).json({
        //     succee: false,
        //     message: 'failed to fetch book',
        //     error,
        // })
        errorHandler(res, error, 404, "failed to fetch book")
    }
}

// create books
export const createbook = async (req: Request, res: Response) => {
    try {
        const { title, authorname, description, quantity } = req.body;

        if (!title || !authorname || !description || !quantity) {
            return res.status(400).json({
                success: false,
                message: "title, authorname, description and quantity are requires fields",
            })
        }

        // const imagePath = req.file ? req.file.path : null;
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "uploads",
                    resource_type: "auto"  // this is used to allow any file type (image, pds etc. by default it takes image file )
                },
                (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error("Cloudinary upload failed"));
                    resolve(result);
                }
            );

            stream.end(req.file!.buffer);
        });

        const imageName = Date.now() + result.public_id + "." + result.format;

        const findbook = await Books.findOne({ where: { title: title } });
        if (findbook) {
            return res.status(400).json({
                success: false,
                message: "book with this title already exists",
            })
        }
        const createbook = await Books.create({
            title,
            authorname,
            description,
            image: imageName as string,
            quantity
        });
        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: createbook,
        })
    } catch (error) {
        // return res.status(500).json({
        //     succee: false,
        //     message: 'failed to create book',
        //     error,
        // })
        errorHandler(res, error, 500, "failed to create book")
    }

}

// update books 
export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const findBook = await Books.findByPk(id as string);
        if (!findBook) {
            return res.status(404).json({
                success: false,
                message: "book not found",
            });
        }
        await findBook.update(req.body);
        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: findBook,
        })
    } catch (error) {
        // return res.status(500).json({
        //     succee: false,
        //     message: 'failed to update books',
        //     error,
        // })
        errorHandler(res, error, 500, "failed to update book")
    }
}

// delete books
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findbook = await Books.findByPk(id as string)
        if (!findbook) {
            return res.status(400).json({
                success: false,
                message: "book not found",
            })
        }
        await findbook.destroy();
        return res.status(201).json({
            success: true,
            message: "Book deleted successfully",
        })
    } catch (error) {
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to delete Book",
        //     error,
        // });
        errorHandler(res, error, 500, "failed to delete Book")
    }
}