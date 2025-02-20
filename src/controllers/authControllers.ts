import express,{Request,Response} from 'express';
import *as authServices from '../services/authServices';
import catchAsync from '../utils/catchAsync';

export const sendOtp = catchAsync(async(req:Request,res:Response) => {
    const otp = await authServices.sentOtp(req.body);
    res.json(otp);
})
export const emailRegister = catchAsync(async(req:Request,res:Response) => {
    const register = await authServices.emailRegister(res,req.body);
    console.log(register)
    res.json(register);
})
export const emailSignIn = catchAsync(async(req:Request,res:Response) => {
    const signin = await authServices.emailSignIn(res,req.body);
    res.json(signin);
})
export const accessTokenGenerator = catchAsync(async(req:Request,res:Response) => {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = await authServices.accessTokenGenerator(refreshToken);
    res.json(accessToken);
})