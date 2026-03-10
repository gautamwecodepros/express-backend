import { Room } from "../models/room.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";

const registerUserDB = async (userData) => {
    const user = await User.create({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
    });
    if (!user) throw ApiError(404, "User not found");
    return user;
};

const getUserDB = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

const updateUserDB = async (userId, payload) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: payload },
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
    // console.log(updatedUser);
    if (!updatedUser) throw new ApiError(404, "User not found");
    return updatedUser;
};

const getUploadedRoomsDB = async (userId) => {
    const rooms = await Room.find({ ownerId: userId });
    if (rooms.length === 0) {
        throw new ApiError(404, "No rooms are listed");
    }
    return rooms;
};

const deleteUserDB = async (userId) => {
    await User.findByIdAndDelete(userId);
    return { message: "User is successfully deleted." };
};

export {
    registerUserDB,
    getUserDB,
    updateUserDB,
    deleteUserDB,
    getUploadedRoomsDB,
};
