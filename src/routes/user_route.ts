import { Router } from "express";
import { verifyToken } from "../middleware/authUser";
import { checkissuedBook, createNewUser, deleteuser, getAlluser, returnBook, updateUser, userdetail, userDetails, userPersonalRecord } from "../controller/user_controller";
import { checkAdmin } from "../middleware/isAdmin";
import { registerValidator } from "../validators/auth_validators";

const router = Router();

router.get("/admin/get-users", verifyToken, checkAdmin, getAlluser)
router.get("/admin/users-detail/:id", verifyToken, checkAdmin, userdetail)
router.post("/admin/user-create", verifyToken, checkAdmin, registerValidator, createNewUser)
router.put("/admin/user-update/:id", verifyToken, checkAdmin, updateUser)
router.delete("/admin/user-delete/:id", verifyToken, checkAdmin, deleteuser)

// route to issue new book and check issued books to user 
router.post("/user/issuedbooks", verifyToken, checkissuedBook)
// if need to add user id from req. paramas then change endpoint to /user/issuedbooks/:user_id

// route to check how many book is issued to a user
// router.post("/issuedBooks/:id",issuedbooks)

// router to return a book 
router.put('/user/return-book', verifyToken, returnBook)

// admin can see user record of issued and return book 
router.get('/admin/user-record/:user_id', verifyToken, userDetails)

// user can see record of its issue and  return book
router.get('/user/record', verifyToken, userPersonalRecord )

export default router;