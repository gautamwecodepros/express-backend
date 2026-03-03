import {
    createUserDB,
    updateUserDB,
    deleteUserDB,
    getUserDB,
    getUploadedRoomsDB,
} from "../services/user.services.js";

const createUser = async (req, res) => {
    try {
        const data = await createUserDB(req.body);

        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const data = await getUserDB(req.user._id);

        if (!data) {
            res.status(404).json({
                message: "User not found!!!",
            });
        }

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const data = await updateUserDB(req.user._id, req.body);

        if (!data) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const getUploadedRooms = async (req, res) => {
    try {
        const data = await getUploadedRoomsDB(req.user._id);

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        await deleteUserDB(req.user._id);

        res.status(204).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export { createUser, updateUser, deleteUser, getUser, getUploadedRooms };
