import { User } from "../models/user.models.js";

const loginUserDB = async (email, password) => {
    try {
        const user = await User.findOne({ email }).select(
            "+password +refreshToken"
        );

        if (!user) throw new Error("User not found");

        const isValid = await user.isPasswordCorrect(password);

        if (!isValid) throw new Error("Invalid Credentials");

        const accessToken = user.generateAccessToken();
        console.log(accessToken);
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { user, accessToken, refreshToken };
    } catch (error) {
        throw error;
    }
};

export { loginUserDB };
