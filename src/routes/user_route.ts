import { Router } from "express";
import { verifyToken } from "../middleware/authUser";
import { checkissuedBook, createNewUser, deleteuser, getAlluser, returnBook, updateUser, userdetail, userDetails } from "../controller/user_controller";
import { checkAdmin } from "../middleware/isAdmin";
import { registerValidator } from "../validators/auth_validators";

const router = Router();

router.get("/users", verifyToken, checkAdmin, getAlluser)
router.get("/users/:id", verifyToken, checkAdmin, userdetail)
router.post("/users", verifyToken, checkAdmin, registerValidator, createNewUser)
router.put("/users/:id", verifyToken, checkAdmin, updateUser)
router.delete("/users/:id", verifyToken, checkAdmin, deleteuser)

// route to issue new book and check issued books to user 
router.post("/user/issuedBooks/:user_id", verifyToken, checkissuedBook)

// route to check how many book is issued to a user
// router.post("/issuedBooks/:id",issuedbooks)

// router to return a book 
router.put('/user/issuedBooks/:user_id', verifyToken, returnBook)

// user can see the record of issued and return book 
router.get('/user-record/:user_id', verifyToken, userDetails)

export default router;