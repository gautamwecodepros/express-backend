import express, { Router } from "express";
import {
    createRoom,
    getAllRooms,
    updateRoom,
    deleteRoom,
} from "../controllers/room.controller.js";
import { filterRoomUpdate } from "../middlewares/filterRoomUpdate.js";

const router = express.Router();

router.post("/", createRoom);
router.get("/", getAllRooms);
router.patch("/:id", filterRoomUpdate, updateRoom);
router.delete("/:id", deleteRoom);

export default router;
