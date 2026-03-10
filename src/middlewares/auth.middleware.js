import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwtVerifications.js";

const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) throw new ApiError(404, "Token not found");

        const decoded = verifyAccessToken(token);

        const user = await User.findById(decoded._id);

        if (!user) throw new ApiError(404, "User not found");

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export { protect };
