import { Room } from "../models/room.models.js";

const createRoomDB = async (roomData) => {
    try {
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

        return room;
    } catch (error) {
        throw error;
    }
};

const getAllRoomsDB = async () => {
    try {
        const rooms = await Room.find();

        if (rooms.length === 0) {
            throw new Error("Can't find any rooms!");
        }
        return rooms;
    } catch (error) {
        throw error;
    }
};

const updateRoomDB = async (roomId, payload) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            { $set: payload },
            {
                runValidators: true,
                returnDocument: "after",
            }
        );

        return updatedRoom;
    } catch (error) {
        throw error;
    }
};

const deleteRoomDB = async (roomId) => {
    try {
        await Room.findByIdAndDelete(roomId);
        return { message: "Room is successfully deleted." };
    } catch (error) {
        throw error;
    }
};

export { createRoomDB, getAllRoomsDB, deleteRoomDB, updateRoomDB };
