import jwt from "jsonwebtoken";
import { config } from "../configs/config";
import CustomError from "./CustomError";
import { ObjectId, Types } from "mongoose";
import { Request, Response } from "express";

interface Itoken {
    userId:Types.ObjectId,
};
 
export const generateAccessToken = (userId: Types.ObjectId) : string => {
    const JWT_SECRET_KEY = config.JWT_SECRET_KEY as string;
    const payload = {userId} as Itoken;
    return jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '15m'});
};

export const generateRefreshToken = (userId: Types.ObjectId) : string => {
    const JWT_SECRET_KEY = config.JWT_SECRET_KEY as string;
    const payload = {userId} as Itoken;
    return jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '7d'});
};

export const verifyAccessToken = (token: string) : Itoken => {
    const JWT_SECRET_KEY = config.JWT_SECRET_KEY as string;
    try{
        const verify = jwt.verify(token, JWT_SECRET_KEY) as Itoken;
        return verify
    }catch(error){
        throw new CustomError('Invalid or expired access token',401);
    }
};

export const verifyRefreshToken = (token: string) : Itoken => {
    const JWT_SECRET_KEY = config.JWT_SECRET_KEY as string;
    try{
        return jwt.verify(token, JWT_SECRET_KEY) as Itoken;
    }catch{
        throw new CustomError('Invalid or expired refresh token',401);
    }
};

export const sentRefreshToken  = (res:Response,token:string) : void => {
    res.cookie('refreshToken',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

export const clearRefreshToken = (req: Request, res: Response): void => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  };