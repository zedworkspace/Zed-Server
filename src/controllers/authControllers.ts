import express,{Request,Response} from 'express';
import *as authServices from '../services/authServices';

export const sendOtp = async(req:Request,res:Response) => {
    try{
        const otp = await authServices.sentOtp(req.body);
        res.json(otp);
    }catch(error){
        console.log(error);
    }
}
export const emailRegister = async(req:Request,res:Response) => {
    try{
        const register = await authServices.emailRegister(req.body);
        res.json(register);
    }catch(error){
        console.log(error);
    }
}
export const emailSignin = async(req:Request,res:Response) => {
    try{
        const signin = await authServices.emailSignin(req.body);
        res.json(signin);
    }catch(error){
        console.log(error);
    }
}