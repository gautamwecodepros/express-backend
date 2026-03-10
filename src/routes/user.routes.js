import { Router } from "express";
import {
    getUser,
    deleteUser,
    getUploadedRooms,
    updateUser,
} from "../controllers/user.controllers.js";
import { filterUserUpdate } from "../middlewares/filterUserUpdate.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

//Authorized routes
router
    .route("/")
    .get(protect, getUser)
    .patch(protect, filterUserUpdate, updateUser)
    .delete(protect, deleteUser);

router.route("/rooms").get(protect, getUploadedRooms);

export default router;
