import dotenv from "dotenv";
dotenv.config();

export const config = {
    MONGO_URI : process.env.MONGO_URI,
    SERVER_PORT : process.env.SERVER_PORT,
    EMAIL : process.env.EMAIL,
    APP_PASSWORD : process.env.APP_PASSWORD,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
}