import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },
        rent: {
            type: Number,
            required: true,
        },
        location: {
            type: {
                street: { type: String, required: true },
                city: { type: String, required: true },
                state: { type: String, required: true },
                country: { type: String, required: true },
                zip: { type: String, required: true },
            },
            _id: false,
            required: true,
        },
        listingType: {
            type: String,
            required: true,
            enum: ["fullRoom", "roomMate"],
            default: "full-room",
        },
        description: {
            type: String,
            trim: true,
        },
        images: [{ type: String }],
        contactInfo: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 10,
            match: [/^[0-9]+$/, "Phone number must contain 10 digits"],
        },
        totalCapacity: {
            type: Number,
            min: 1,
            default: 1,
            required: true,
        },
        currentOccupants: {
            type: Number,
            min: 0,
            default: 0,
            required: true,
            validate: {
                validator: function (value) {
                    if (this.listingType === "fullRoom") return value === 0;

                    if (this.listingType === "roomMate")
                        return value < this.totalCapacity;
                },
                message:
                    "Can't have Current Occupants if type is full room and can't exceed the total capacity ",
            },
        },
        preferredGender: {
            type: String,
            enum: ["male", "female", "any"],
            required: true,
            default: "any",
        },
        preferredOccupation: {
            type: String,
            enum: ["student", "professional", "any"],
            required: true,
            default: "any",
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
