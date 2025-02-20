import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../utils/CustomError";
import { config } from "../configs/config";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) throw new CustomError("Access denied, token missing!", 400);

    const JWT_SECRET_KEY = config.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) throw new CustomError("Key missing!", 400);

    try {
        const verified = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
        (req as any).user = verified ;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
