import {
    createRoomDB,
    getAllRoomsDB,
    updateRoomDB,
    deleteRoomDB,
} from "../services/room.services.js";

const createRoom = async (req, res) => {
    try {
        const data = await createRoomDB(req.body);

        if (!data) {
            res.status(400).json({
                message: "Bad request",
            });
        }

        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const data = await getAllRoomsDB();

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};

const updateRoom = async (req, res) => {
    try {
        const data = await updateRoomDB(req.params.id, req.filteredUpdates);

        if (!data) {
            res.status(404).json({
                success: false,
                message: "Room not found",
            });
        }

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};

const deleteRoom = async (req, res) => {
    try {
        await deleteRoomDB(req.params.id);

        res.status(204).json({
            success: true,
            message: "Room deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};

export { createRoom, getAllRooms, updateRoom, deleteRoom };
