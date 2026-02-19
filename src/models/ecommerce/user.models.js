import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 3,
            maxlength: 15,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            zip: String,
        },
        wishlists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
