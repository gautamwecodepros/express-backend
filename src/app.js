import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import roomRouter from "./routes//room.routes.js";

const app = express();

//cors setup
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);

export default app;
