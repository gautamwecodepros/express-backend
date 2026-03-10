import { User } from "../models/user.models.js";
import { loginUserDB } from "../services/auth.services.js";
import { registerUserDB } from "../services/user.services.js";
import { verifyRefreshToken } from "../utils/jwtVerifications.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
};

const registerUser = asyncHandler(async (req, res) => {
    const data = await registerUserDB(req.body);
    return res.status(201).json({
        success: true,
        data,
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await loginUserDB(
        req.body.email,
        req.body.password
    );

    if (!user) throw new ApiError("User not found");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            user,
        });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        throw new ApiError(404, "Refresh token not found");
    }

    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded._id).select("+refreshToken");

    if (!user || user.refreshToken !== token) {
        throw new ApiError(401, "Invalid Refresh Token");
    }

    const newAccessToken = await user.generateAccessToken();
    console.log("New Access Token", newAccessToken);

    return res
        .status(200)
        .cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        })
        .json({
            success: true,
        });
});

const logoutUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: "" },
    });
    if (!user) {
        throw new ApiError(404, "Can't find user to logout");
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            success: true,
        });
};

export { loginUser, refreshAccessToken, logoutUser, registerUser };
