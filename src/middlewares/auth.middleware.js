import { User } from "../models/user.models";
import { verifyAccessToken } from "../utils/jwt.varify.utils.js";

export const protect = async (req, res, next) => {
    try {
        const token =
            req.cookies.accessToken ||
            req.header("Authorization").replace("Bearer", "");

        if (!token) throw new Error("Unauuthorized");

        const decoded = verifyAccessToken(token);

        const user = await User.findById(decoded._id);
        if (!user) throw new Error("Unauuthorized");

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            error: error.message,
        });
    }
};
