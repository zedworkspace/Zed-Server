import dotenv from "dotenv";
dotenv.config();

export const config = {
    MONGO_URI : process.env.MONGO_URI,
    SERVER_PORT : process.env.SERVER_PORT,
}