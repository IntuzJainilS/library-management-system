import { Router } from "express";
import { userRegister } from "../controller/auth_controller";

const router = Router();

router.post("/login",);
router.post("/register", userRegister);