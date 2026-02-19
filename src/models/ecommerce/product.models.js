import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        compareprice: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        images: [
            {
                type: String,
            },
        ],
        isactive: {
            type: Boolean,
            default: false,
        },
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Categories",
            },
        ],
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
