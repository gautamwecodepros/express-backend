import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db/index.js";

const Port = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(Port, () => {
            console.log(
                `The server is working on port: http://localhost:${Port}`
            );
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed: ", error);
    });
