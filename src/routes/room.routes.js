import { Router } from "express";
import {
    createRoom,
    getAllRooms,
    updateRoom,
    deleteRoom,
} from "../controllers/room.controller.js";
import { filterRoomUpdate } from "../middlewares/filterRoomUpdate.js";

const router = Router();

router.route("/").post(createRoom).get(getAllRooms);
router.route("/:id").patch(filterRoomUpdate, updateRoom).delete(deleteRoom);

export default router;
