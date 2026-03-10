import { Router } from "express";
import {
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validateData } from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validations/user.validation.js";

const router = Router();

router.route("/register").post(validateData(createUserSchema), registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").post(refreshAccessToken);
router.route("/logout").post(protect, logoutUser);

export default router;
