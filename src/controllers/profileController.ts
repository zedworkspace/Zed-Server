import { Request, Response } from "express";
import { getUserProfile, updateUserProfile } from "../services/profileServices";
import catchAsync from "../utils/catchAsync";

export const getProfile =  catchAsync(async(req: Request, res: Response) => {
        const { userId } = req.params;
        const profile = await getUserProfile(userId);
        res.status(200).json(profile);
})

export const updateProfile = catchAsync(async(req:Request, res:Response) => {
        const { userId } = req.params;
        const profileImg = req.file
        const profile = await updateUserProfile(req.body,userId,profileImg)
        res.status(201).json({message:"profile Updated",data:profile})  
})
