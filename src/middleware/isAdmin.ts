import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./authUser";

export const checkAdmin = (req: Request, res:Response, next:NextFunction) => {
    if (req.user.usertype  !== "Admin") {
        return res.status(500).json({
            message:"only admin can access this routes"
        })
    }
    next()
}