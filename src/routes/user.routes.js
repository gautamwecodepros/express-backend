import express from "express";
import {
    createUser,
    getUser,
    deleteUser,
    getUploadedRooms,
    updateUser,
} from "../controllers/user.controllers.js";
import { filterUserUpdate } from "../middlewares/filterUserUpdate.js";
import { protect } from "../middlewares/auth.middleware.js";
import { loginUser, logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();

//Public routes
router.post("/create", createUser);  
router.post("/login", loginUser);

//Authorized routes
router.get("/", protect, getUser);
router.get("/rooms", protect, getUploadedRooms);
router.patch("/", protect, filterUserUpdate, updateUser);
router.delete("/", protect, deleteUser);
router.post("/logout", logoutUser);

export default router;
