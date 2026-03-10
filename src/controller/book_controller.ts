import { Request, Response } from "express";
import { Books } from "../models/book_model";

// to get all books
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const getBooks = await Books.findAll();
        return res.status(200).json({
            success: true,
            message: "user gets successfully",
            data: getBooks,
        })
    } catch (error) {
        return res.status(500).json({
            succee: false,
            message: 'failed to fetch books',
            error,
        })
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
        return res.status(500).json({
            succee: false,
            message: 'failed to fetch books',
            error,
        })
    }
}

// create books
export const createbook = async (req: Request, res: Response) => {
    try {
        const { title, authorname, image, quantity } = req.body;

        if (!title || !authorname || !quantity) {
            return res.status(400).json({
                success: false,
                message: "title, authorname, quantity are requires fields",
            })
        }

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
            image,
            quantity
        });
        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: createbook,
        })
    } catch (error) {
        return res.status(500).json({
            succee: false,
            message: 'failed to create book',
            error,
        })
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
        return res.status(500).json({
            succee: false,
            message: 'failed to update books',
            error,
        })
    }
}

// delete books
export const deleteBook = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;

        const findbook = await Books.findByPk(id as string)
        if (!findbook) {
            return res.status(400).json({
                success: false,
                message:"book not found",
            })
        }
        await findbook.destroy();
        return res.status(201).json({
            success: true,
            message: "Book deleted successfully",
        })
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: "Failed to delete Book",
            error,
        });
    }
}