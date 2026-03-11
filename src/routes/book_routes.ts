import { Router } from "express";
import { createbook, deleteBook, getAllBooks, getSinglebook, updateBook } from "../controller/book_controller";
import { checkAdmin } from "../middleware/isAdmin";
import { verifyToken } from "../middleware/authUser";
import { createBookValidator } from "../validators/auth_validators";
import { upload } from "../middleware/ImageUpload";
 
const router = Router();

router.get("/books", verifyToken, getAllBooks);
router.get("/books/:id", verifyToken, getSinglebook)
router.post("/admin/books", verifyToken, checkAdmin, upload.single('image-file'), createBookValidator, createbook)
router.put("/admin/books/:id", verifyToken, checkAdmin, createBookValidator, updateBook)
router.delete("/admin/books/:id", verifyToken, checkAdmin, deleteBook)

export default router;