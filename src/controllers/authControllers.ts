import express,{Request,Response} from 'express';
import *as authServices from '../services/authServices';
import catchAsync from '../utils/catchAsync';
import CustomError from '../utils/CustomError';

export const sendOtp = catchAsync(async(req:Request,res:Response) => {
    const otp = await authServices.sentOtp(req.body);
    res.status(200).json(otp);
})
export const emailRegister = catchAsync(async(req:Request,res:Response) => {
    const register = await authServices.emailRegister(res,req.body);
    res.status(200).json(register);
})
export const emailSignIn = catchAsync(async(req:Request,res:Response) => {
    const signin = await authServices.emailSignIn(res,req.body);
    res.status(200).json(signin);
})
export const accessTokenGenerator = catchAsync(async(req:Request,res:Response) => {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = await authServices.accessTokenGenerator(refreshToken);
    res.status(200).json(accessToken);
})
export const sendResetOtp = catchAsync(async(req:Request,res:Response) => {
    const otp = await authServices.sentResetOtp(req.body);
    res.status(200).json(otp);
})
export const resetPassword = catchAsync(async(req:Request,res:Response) => {
    const register = await authServices.resetPassword(req.body);
    res.status(200).json({message:"Rest Password Sucessfull, Login Now"});
})
export const googleAuth = catchAsync(async (req:Request,res:Response) => {
    const {credentialResponse} = req.body;
    const userData = await authServices.googleAuth(res,credentialResponse);
    res.status(200).json(userData);
});
export const githubAuth = catchAsync(async (req:Request,res:Response) => {
    const {code} = req.body;
    const userData = await authServices.githubAuth(res,code);
    res.status(200).json(userData);
});     