import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export const Categories = mongoose.model("Categories", categorySchema);
