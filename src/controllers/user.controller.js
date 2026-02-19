import { User } from "../models/ecommerce/user.models.js";

export const registerUser = async (req, res) => {
    try {
        const data = await User.create({
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            address: req.body.address,
            wishlists: [],
        });

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
