import { Router } from "express";
import { createbook, deleteBook, getAllBooks, getSinglebook, updateBook } from "../controller/book_controller";
import { checkAdmin } from "../middleware/isAdmin";
import { verifyToken } from "../middleware/authUser";
import { createBookValidator } from "../validators/auth_validators";
import { upload } from "../middleware/ImageUpload";
 
const router = Router();

router.get("/admin/get-books", verifyToken, getAllBooks);
router.get("/books/:id", verifyToken, getSinglebook)
router.post("/admin/create-books", verifyToken, checkAdmin, upload.single('image'), createBookValidator, createbook)
router.put("/admin/update-books/:id", verifyToken, checkAdmin, upload.single('image'), updateBook)
router.delete("/admin/delete-books/:id", verifyToken, checkAdmin, deleteBook)

export default router;