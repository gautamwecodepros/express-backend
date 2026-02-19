import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            `${process.env.MONGO_URI}/${DB_NAME}`
        );
        // console.log(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure}
    }
};

export default connectDB;
