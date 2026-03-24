import { Request, Response } from "express";
import { user } from "../models/user_model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
// import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import dotenv from "dotenv";
import { searchuserTypes } from "../interface/user_interface";
import { errorHandler } from "../utils/errorHandler";

dotenv.config();

// register controller
export const userRegister = async (req: Request, res: Response) => {
    // console.log("----------------------", req);
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

        const hashedpassword = await bcrypt.hash(password, 10);

        const createUser = await user.create({
            full_name,
            email,
            password:hashedpassword,
            mobile,
            gender,
            birthdate,
        })
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: createUser,
        })
    } catch (error) {
        // return res.status(501).json({
        //     succee: false,
        //     message: 'failed to create user',
        //     error,
        // })
        errorHandler(res,error,501,"failed to create user")
    }
}

// login controller
export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.status(400).json({
            success: false,
            message: "input required fields"
        })
    }

    const searchUser : searchuserTypes  = await user.findOne({
        where: { email: email }
    }) as any

    if (!searchUser) {
        return res.status(404).json({ message: "User not found" });
    }
    // console.log("password", password)
    // console.log(searchUser.password)

    const isMatch = await bcrypt.compare(password, searchUser.password);
    // console.log("hased password", isMatch)

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: searchUser.user_id, email: searchUser.email, usertype: searchUser.usertype },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );
    res.json({ success:true,token,email:searchUser.email, usertype:searchUser.usertype });
}