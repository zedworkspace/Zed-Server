import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../utils/CustomError";
import { config } from "../configs/config";
import User from "../models/userModel";
import { IUser } from "../interfaces/userInterface";

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const userAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) return next(new CustomError("Access denied, token missing!", 401));

    const JWT_SECRET_KEY = config.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) return next(new CustomError("Key missing!", 400));

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
        const user = await User.findById(decoded.userId);

        if (!user) return next(new CustomError("Access Forbidden", 403));

        req.user = user as IUser;
        next();
    } catch (error) {
        next(new CustomError("Invalid token", 401));
    }
};
