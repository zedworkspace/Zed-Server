import { Request, Response } from "express";
import { getUserProfile, updateUserProfile } from "../services/profileServices";
import catchAsync from "../utils/catchAsync";
import { IUser } from "../interfaces/userInterface";
import { clearRefreshToken } from "../utils/jwtToken";

export const getProfile =  catchAsync(async(req: Request, res: Response) => {
        const user = req.user as IUser
        const profile = await getUserProfile(user._id);
        res.status(200).json(profile);
})

export const updateProfile = catchAsync(async(req:Request, res:Response) => {
        const user = req.user as IUser
        const profileImg = req.file
        const profile = await updateUserProfile(req.body,user._id,profileImg)
        res.status(201).json({message:"profile Updated",data:profile})  
})

export const logoutUser = catchAsync(async(req:Request, res:Response) => {
        clearRefreshToken(res)
        res.status(200).json({ message: "Logged out successfully" });
})
