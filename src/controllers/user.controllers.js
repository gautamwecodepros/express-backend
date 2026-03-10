import {
    updateUserDB,
    deleteUserDB,
    getUserDB,
    getUploadedRoomsDB,
} from "../services/user.services.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUser = asyncHandler(async (req, res) => {
    const data = await getUserDB(req.user._id);

    if (!data) throw new ApiError(404, "User not found!!!");

    return res.status(200).json({
        success: true,
        data,
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const data = await updateUserDB(req.user._id, req.body);
    // console.log(data);
    if (!data) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json({
        success: true,
        data,
    });
});

const getUploadedRooms = asyncHandler(async (req, res) => {
    const data = await getUploadedRoomsDB(req.user._id);

    if (!data) throw new ApiError(404, "No rooms are listed");

    return res.status(200).json({
        success: true,
        data,
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    await deleteUserDB(req.user._id);

    return res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});
export { updateUser, deleteUser, getUser, getUploadedRooms };
