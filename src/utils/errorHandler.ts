import { Response } from "express";

export const errorHandler = (res: Response, error: any, status:number, message:string) => {
  console.log(error);
  return res.status(status).json({ message: message as string });
};