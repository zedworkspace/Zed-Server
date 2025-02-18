import { IUser } from "../interfaces/userInterface";
import User from "../models/userModel";
import bycrpt from 'bcrypt';
import { generateOtp, sendOtpEmail } from "../utils/otpGenerator";

export const sentOtp = async (userData : IUser) : Promise<object> => {
    const {email} = userData;
    const existEmail = User.findOne({email});
    if(!existEmail) throw new Error('User already exist !');
    const otp = generateOtp();
    sendOtpEmail(email,otp);
    return {email,otp};
}

export const emailRegister = async (userData : IUser) : Promise<object> => {
    const {name,email,password} = userData; 
    const hashedPassword = await bycrpt.hash(password,10);
    const user = await User.create({name,email,password:hashedPassword});
    if(!user) throw new Error('User not created !');
    return {
            name:user.name,
            email:user.email,
            profileImg:user.profileImg
        }
};
export const emailSignin = async (userData : IUser) : Promise<object> => {
    const {email,password} = userData; 
    const user = await User.findOne({email});
    if(!user) throw new Error('Invalid email !');
    const verifyPassword = await bycrpt.compare(password,user.password);
    if(!verifyPassword) throw new Error('Invalid password !');
    return {
            name:user.name,
            email:user.email,
            profileImg:user.profileImg
        }
};

