import { Room } from "../models/room.models.js";
import { ApiError } from "../utils/ApiError.js";

const createRoomDB = async (roomData) => {
    const room = await Room.create({
        title: roomData.title,
        rent: roomData.rent,
        location: {
            street: roomData.location.street,
            city: roomData.location.city,
            state: roomData.location.state,
            country: roomData.location.country,
            zip: roomData.location.zip,
        },
        listingType: roomData.listingType,
        description: roomData.description,
        images: roomData.images,
        contactInfo: roomData.contactInfo,
        totalCapacity: roomData.totalCapacity,
        currentOccupants: roomData.currentOccupants,
        preferredGender: roomData.preferredGender,
        preferredOccupation: roomData.preferredOccupation,
        ownerId: roomData.user._id,
    });

    if (!room) throw new ApiError(400, "failed to create room");
    return room;
};

const getAllRoomsDB = async () => {
    const rooms = await Room.find();

    if (rooms.length === 0) {
        throw new ApiError(404, "Can't find any rooms!");
    }
    return rooms;
};

const updateRoomDB = async (roomId, payload) => {
    const updatedRoom = await Room.findByIdAndUpdate(
        roomId,
        { $set: payload },
        {
            runValidators: true,
            returnDocument: "after",
        }
    );
    if (!updatedRoom) throw new ApiError(404, "Room not found");

    return updatedRoom;
};

const deleteRoomDB = async (roomId) => {
    await Room.findByIdAndDelete(roomId);
    return { message: "Room is successfully deleted." };
};

export { createRoomDB, getAllRoomsDB, deleteRoomDB, updateRoomDB };
