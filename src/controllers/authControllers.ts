import express,{Request,Response} from 'express';
import *as authServices from '../services/authServices';
import catchAsync from '../utils/catchAsync';

export const sendOtp = catchAsync(async(req:Request,res:Response) => {
    const otp = await authServices.sentOtp(req.body);
    res.json(otp);
})
export const emailRegister = catchAsync(async(req:Request,res:Response) => {
    const register = await authServices.emailRegister(req.body);
    res.json(register);
})
export const emailSignIn = catchAsync(async(req:Request,res:Response) => {
    const signin = await authServices.emailSignIn(req.body);
    res.json(signin);
})