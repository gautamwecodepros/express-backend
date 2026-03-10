import {
    createRoomDB,
    getAllRoomsDB,
    updateRoomDB,
    deleteRoomDB,
} from "../services/room.services.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createRoom = asyncHandler(async (req, res) => {
    const data = await createRoomDB(req.body);

    if (!data) throw new ApiError(400, "Bad request");

    res.status(201).json({
        success: true,
        data,
    });
});

const getAllRooms = asyncHandler(async (req, res) => {
    const data = await getAllRoomsDB();

    if (!data) throw new ApiError(404, "Rooms not found");
    res.status(200).json({
        success: true,
        data,
    });
});

const updateRoom = asyncHandler(async (req, res) => {
    const data = await updateRoomDB(req.params.id, req.filteredUpdates);

    if (!data) throw new ApiError(404, "Rooms not found");

    res.status(200).json({
        success: true,
        data,
    });
});

const deleteRoom = asyncHandler(async (req, res) => {
    await deleteRoomDB(req.params.id);

    res.status(204).json({
        success: true,
        message: "Room deleted successfully",
    });
});

export { createRoom, getAllRooms, updateRoom, deleteRoom };
