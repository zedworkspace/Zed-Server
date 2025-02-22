import { IUser } from "../interfaces/userInterface";
import User from "../models/userModel";
import bycrpt from 'bcrypt';
import { generateOtp, sendOtpEmail } from "../utils/otpGenerator";
import CustomError from "../utils/CustomError";
import { generateAccessToken, generateRefreshToken, sentRefreshToken, verifyRefreshToken } from "../utils/jwtToken";
import { Response } from "express";

export const sentOtp = async (userData : IUser) : Promise<object> => {
    const {email} = userData;
    const existEmail = await User.findOne({email});
    if(existEmail) throw new CustomError('User already exist !',400);
    const otp = generateOtp();
    sendOtpEmail(email,otp);
    return {email,otp};
}

export const emailRegister = async (res : Response, userData : IUser) : Promise<object> => {
    const {name,email,password} = userData;
    if (!password) throw new CustomError("Password is required", 400);
    const hashedPassword = await bycrpt.hash(password,10);
    const user = await User.create({name,email,password:hashedPassword});
    if(!user) throw new CustomError('User not created !',400);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    sentRefreshToken(res,refreshToken);
    return {
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImg:user.profileImg,
            accessToken
        }
};
export const emailSignIn = async (res : Response, userData : IUser) : Promise<object> => {
    const {email,password} = userData; 
    const user = await User.findOne({email});
    if(!user) throw new CustomError('Invalid email or password !',404);
    if (!password || !user.password) throw new CustomError("Invalid credentials", 400);
    const verifyPassword = await bycrpt.compare(password,user.password);
    if(!verifyPassword) throw new CustomError('Invalid email or password !',404);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    sentRefreshToken(res,refreshToken);
    return {
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImg:user.profileImg,
            accessToken
        } 
};
export const accessTokenGenerator = async (refToken:string) : Promise <object> => {
    const payload =  verifyRefreshToken(refToken);
    if(!payload.userId) throw new CustomError("Unauthorized !",401);
    const newAccessToken = generateAccessToken(payload.userId);
    return {accessToken:newAccessToken}
}
