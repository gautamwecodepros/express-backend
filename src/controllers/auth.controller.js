import { loginUserDb } from "../services/auth.services.js";
import { User } from "../models/user.models";
import { verifyRefreshToken } from "../utils/jwt.varify.utils.js";

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await loginUserDb(
            email,
            password
        );

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        };

        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                success: true,
                user,
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};

const refreshAccessToken = async () => {
    const token = req.cookie?.refreshAccessToken;

    if (!token) res.status(401).json({ message: "No refresh token" });

    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded._id).select("+refreshToken");
    if (!user || token !== user.refreshToken) {
        res.status(401).json({ message: "No refresh token" });
    }

    const newAccessToken = user.generateAccessToken();

    return res
        .cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        })
        .json({ success: true });
};

const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $set: { refreshToken: "" },
        });

        res.clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({ success: true });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};

export { loginUser, logoutUser, refreshAccessToken };
