import { loginUserDB } from "../services/auth.services.js";

const loginUser = async (req, res) => {
    try {
        const { user, accessToken, refreshToken } = await loginUserDB(
            req.body.email,
            req.body.password
        );

        if (!user) throw new Error("User not found");

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
            message: error.message,
        });
    }
};

export { loginUser };
