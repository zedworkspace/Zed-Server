import { IUser } from "../interfaces/userInterface";
import User from "../models/userModel";
import bycrpt from 'bcrypt';
import { generateOtp, sendOtpEmail } from "../utils/otpGenerator";
import CustomError from "../utils/CustomError";
import { generateAccessToken, generateRefreshToken, sendRefreshToken, verifyRefreshToken } from "../utils/jwtToken";
import { Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { CredentialResponse } from "../interfaces/CredentialInerface";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

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
    const avatarUrl = `https://ui-avatars.com/api/?name=${name.charAt(0)}&random`;
    const user = await User.create({name,email,profileImg:avatarUrl,password:hashedPassword});
    if(!user) throw new CustomError('User not created !',400);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    sendRefreshToken(res,refreshToken);
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
    sendRefreshToken(res,refreshToken);
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
export const sentResetOtp = async (userData : IUser) : Promise<object> => {
    const {email} = userData;
    const existEmail = await User.findOne({email});
    if(!existEmail) throw new CustomError('User not found !',404);
    const otp = generateOtp();
    sendOtpEmail(email,otp);
    return {email,otp};
}
export const resetPassword = async (userData : IUser) : Promise<object> => {
    const {email,password} = userData; 
    const user = await User.findOne({email});
    if(!user) throw new CustomError('User not found !',404);
    if (!password) throw new CustomError("Password is required", 400);
    const hashedPassword = await bycrpt.hash(password,10);
    user.password = hashedPassword;
    return user.save();
};
export const googleAuth = async (res:Response, credentialResponse : CredentialResponse ) : Promise <any> => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    if (!credentialResponse) {
      throw new CustomError("No google credentials provided!", 400);
    }
    const googleUser = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${credentialResponse.access_token}` },
      }
    );

    const { email, name, picture,id:googleId } = googleUser.data;
    let existUser,user;
    let accessToken,refreshToken;
    existUser = await User.findOne({email});
    if(existUser) {
      accessToken = generateAccessToken(existUser._id);
      refreshToken = generateRefreshToken(existUser._id);
      sendRefreshToken(res,refreshToken);
      user = existUser;
    }else{
      user = await User.create({email,name,profileImg:picture,googleId});
      if(!user) throw new CustomError("Auth faild !",400);
      accessToken = generateAccessToken(user._id);
      refreshToken = generateRefreshToken(user._id);
      sendRefreshToken(res,refreshToken);
    }
    if(!user) throw new CustomError("Auth faild !",400);
    return {
      name:user.name,
      profileImg:user.profileImg,
      email:user.email,
      accessToken
      }
  }

  export const githubAuth = async (res: Response, code: string): Promise<any> => {
    if (!code) {
      throw new CustomError("No GitHub code provided!", 400);
    }
  
    // Exchange code for an access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );
  
    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      throw new CustomError("Failed to retrieve GitHub access token", 400);
    }
  
    // Fetch user data from GitHub
    const githubUserResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { id: gitHubId, name, avatar_url:profileImg, email } = githubUserResponse.data;
  
    if(!email) throw new CustomError('Email is privet Use another methode !',404)

    let existingUser, user;
    let refreshToken;
    existingUser = await User.findOne({ email });
    if (existingUser) {
      refreshToken = generateRefreshToken(existingUser._id);
      sendRefreshToken(res, refreshToken);
      user = existingUser;
    } else {
      user = await User.create({email,name,profileImg,gitHubId,});
      if (!user) throw new CustomError("Authentication failed!", 400);
      refreshToken = generateRefreshToken(user._id);
      sendRefreshToken(res, refreshToken);
    }
    return {
      name: user.name,
      profileImg: user.profileImg,
      email: user.email,
      accessToken: generateAccessToken(user._id),
    };
  };