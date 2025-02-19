import { IUser } from "../interfaces/userInterface";
import User from "../models/userModel";
import bycrpt from 'bcrypt';
import { generateOtp, sendOtpEmail } from "../utils/otpGenerator";
import CustomError from "../utils/CustomError";

export const sentOtp = async (userData : IUser) : Promise<object> => {
    const {email} = userData;
    const existEmail = await User.findOne({email});
    if(existEmail) throw new CustomError('User already exist !',400);
    const otp = generateOtp();
    sendOtpEmail(email,otp);
    return {email,otp};
}

export const emailRegister = async (userData : IUser) : Promise<object> => {
    const {name,email,password} = userData; 
    const hashedPassword = await bycrpt.hash(password,10);
    const user = await User.create({name,email,password:hashedPassword});
    if(!user) throw new CustomError('User not created !',400);
    return {
            name:user.name,
            email:user.email,
            profileImg:user.profileImg
        }
};
export const emailSignIn = async (userData : IUser) : Promise<object> => {
    const {email,password} = userData; 
    const user = await User.findOne({email});
    if(!user) throw new CustomError('Invalid email or password !',404);
    const verifyPassword = await bycrpt.compare(password,user.password);
    if(!verifyPassword) throw new CustomError('Invalid email or password !',404);
    return {
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImg:user.profileImg
        }
};

