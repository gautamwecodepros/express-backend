import { Router } from "express";
import {
    createUser,
    getUser,
    deleteUser,
    getUploadedRooms,
    updateUser,
} from "../controllers/user.controllers.js";
import { filterUserUpdate } from "../middlewares/filterUserUpdate.js";
import { loginUser } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

//Public routes
router.route("/create").post(createUser);
router.route("/login").post(loginUser);

//Authorized routes
router
    .route("/")
    .get(protect, getUser)
    .patch(protect, filterUserUpdate, updateUser)
    .delete(protect, deleteUser);
router.route("/rooms").get(protect, getUploadedRooms);
// router.route("/logout").post();

export default router;
