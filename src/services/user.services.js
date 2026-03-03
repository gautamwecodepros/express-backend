import { Room } from "../models/room.models.js";
import { User } from "../models/user.models.js";

const createUserDB = async (userData) => {
    try {
        const user = await User.create({
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
        });
        return user;
    } catch (error) {
        throw error;
    }
};

const getUserDB = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found!!!");
        }

        return user;
    } catch (error) {
        throw error;
    }
};

const updateUserDB = async (userId, payload) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: payload },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        return updatedUser;
    } catch (error) {
        throw error;
    }
};

const getUploadedRoomsDB = async (userId) => {
    try {
        const rooms = await Room.find({ ownerId: userId });
        if (rooms.length === 0) {
            throw new Error("No rooms are listed");
        }
        return rooms;
    } catch (error) {
        throw error;
    }
};

const deleteUserDB = async (userId) => {
    try {
        await User.findByIdAndDelete(userId);
        return { message: "User is successfully deleted." };
    } catch (error) {
        throw error;
    }
};

export {
    createUserDB,
    getUserDB,
    updateUserDB,
    deleteUserDB,
    getUploadedRoomsDB,
};
