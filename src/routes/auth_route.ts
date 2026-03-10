import { Router } from "express";
import { userLogin, userRegister } from "../controller/auth_controller";
import { loginvalidator, registerValidator } from "../validators/auth_validators";

const router = Router();

router.post("/login", loginvalidator, userLogin);
router.post("/register", registerValidator, userRegister);

export default router;