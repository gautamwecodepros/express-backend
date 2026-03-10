import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import roomRouter from "./routes/room.routes.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

//cors setup
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);

app.use(errorHandler);
export default app;
