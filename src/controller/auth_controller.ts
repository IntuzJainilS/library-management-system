import { Request, Response } from "express";
import { user } from "../models/user_model";

export const userRegister = async (req: Request, res: Response) => {
    try {
        const { full_name, email, password, mobile, gender, birthdate } = req.body;

        if (!full_name || !email || !password || !mobile || !gender || !birthdate) {
            return res.status(400).json({
                message: "provide every field",
            })
        }

        const findUser = await user.findOne({ where: { email: email } });
        if (findUser) {
            return res.status(400).json({
                message: "user already exist"
            })
        }

        const createUser = await user.create(req.body)
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: createUser,
        })
    } catch (error) {
        return res.status(500).json({
            succee: false,
            message: 'failed to create user',
            error,
        })
    }
}

// export const userLogin = async (req: Request, res: Response) => {
//     const { email, mobile, password } = req.body;

//     if (!password) {
//         return res.json({
//             success: false,
//             message: "password is required"
//         })
//     }

//     const searchUser = await user.findOne({
//         where: {
//             password: password,
//             $or: [
//                 { email: { $eq: email },
//       { mobile: { $eq: mobile } }
//             ]
//         }
//     })
// }