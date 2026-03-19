import { Op, Model, ModelStatic } from 'sequelize';

interface QueryOptions {
    page?: number;
    limit?: number;
    search?: string;
    searchFields?: string[];
    sortBy?: string;
    order?: string;
    allowedSortColumns: string[];
    defaultSort?: string;
}

export const getPaginatedData = async (
    model: ModelStatic<any>, 
    options: QueryOptions,
    extraWhere: any = {}
) => {
    const {
        page = 1,
        limit = 10,
        search,
        searchFields = [],
        sortBy = 'createdAt',
        order = 'DESC',
        allowedSortColumns,
        defaultSort = 'createdAt'
    } = options;

    // 1. Validate Sort & Order
    const safeSortBy = allowedSortColumns.includes(sortBy) ? sortBy : defaultSort;
    const safeOrder = ['ASC', 'DESC'].includes(order.toUpperCase()) ? order.toUpperCase() : 'DESC';

    // 2. Pagination Logic
    const offset = (Number(page) - 1) * Number(limit);

    // 3. Search Logic
    const whereClause: any = { ...extraWhere };
    if (search && searchFields.length > 0) {
        whereClause[Op.or] = searchFields.map(field => ({
            [field]: { [Op.like]: `%${search}%` }
        }));
    }

    // 4. Database Query
    const { count, rows } = await model.findAndCountAll({
        where: whereClause,
        limit: Number(limit),
        offset: offset,
        order: [[safeSortBy, safeOrder]],
        distinct: true,
    });

    return {
        data: rows,
        pagination: {
            totalItems: count,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: Number(page),
        }
    };
};


// use like this in controller 



// original working code of get user controller
// const {
//             page = 1,
//             limit = 10,
//             // issuedbooks,
//             search,
//             sort_by = 'createdAt',
//             order = 'DESC'
//         } = req.query;

//         // console.log('search value',search);
//         // columns for sorting
//         const columnsAllowedForSorting = ['full_name', 'email', 'mobile', 'gender'];

//         // validate sortby columns
//         const safeSortBy = columnsAllowedForSorting.includes(sort_by as string)
//             ? sort_by
//             : 'createdAt'; // Default if invalid

//         //validate order
//         const safeOrder = ['ASC', 'DESC'].includes((order as string).toUpperCase())
//             ? (order as string).toUpperCase()
//             : 'DESC';


//         // pagination code
//         const offset = (Number(page) - 1) * Number(limit);

//         const whereClause: any = {};

//         // search filtering code
//         if (search) {
//             whereClause[Op.or] = [
//                 { full_name: { [Op.like]: `%${search}%` } },
//                 { email: { [Op.like]: `%${search}%` } },
//                 {user_id: { [Op.like]: `%${search}%`}},
//                 {mobile: { [Op.like]: `%${search}%`}},
//                 {birthdate: { [Op.like]: `%${search}%`}},
//             ];
//         }

//         // const includeClause: any[] = [
//         //     {
//         //         model: Books,
//         //         as: "books",
//         //         attributes: ['name'],
//         //         through: { attributes: [] },
//         //         where: issuedbooks ? { name: { [Op.like]: `%${issuedbooks}%` } } : {},
//         //         required: issuedbooks ? true : false,
//         //     }
//         // ];

//         const { count, rows } = await user.findAndCountAll({
//             where: whereClause,
//             // include: includeClause,
//             distinct: true,
//             limit: Number(limit),
//             offset: offset,
//             order: [[safeSortBy as string, safeOrder as string]],
//         });

//         if (count === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No user found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             pagination: {
//                 totalItems: count,
//                 totalPages: Math.ceil(count / Number(limit)),
//                 currentPage: Number(page),
//             },
//             data: rows,
//         });