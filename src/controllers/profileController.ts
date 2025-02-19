import { Request, Response } from "express";
import { getUserProfile } from "../services/profileServices";
import catchAsync from "../utils/catchAsync";

export const getProfile =  catchAsync(async(req: Request, res: Response): Promise<Response> => {
        const { userId } = req.params;
        const profile = await getUserProfile(userId);
        return res.status(200).json(profile);
})
