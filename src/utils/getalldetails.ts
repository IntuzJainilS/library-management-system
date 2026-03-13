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
// export const getAllUser = async (req: Request, res: Response) => {
//     try {
//         const result = await getPaginatedData(user, {
//             ...req.query,
//             allowedSortColumns: ['full_name', 'email', 'mobile', 'gender'],
//             searchFields: ['full_name', 'email', 'user_id', 'mobile', 'birthdate'],
//             defaultSort: 'createdAt'
//         });

//         if (result.pagination.totalItems === 0) {
//             return res.status(404).json({ success: false, message: "No users found" });
//         }

//         return res.status(200).json({ success: true, ...result });
//     } catch (error) {
//         errorHandler(res, error, 404, "Failed to fetch users");
//     }
// };
