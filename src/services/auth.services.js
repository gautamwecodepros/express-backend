import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";

const loginUserDB = async (email, password) => {
    const user = await User.findOne({ email }).select(
        "+password +refreshToken"
    );

    if (!user) throw new ApiError(404, "User not found");

    const isValid = await user.isPasswordCorrect(password);

    if (!isValid) throw new ApiError(401, "Invalid Credentials");

    const accessToken = user.generateAccessToken();
    console.log(accessToken);
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { user, accessToken, refreshToken };
};

export { loginUserDB };
