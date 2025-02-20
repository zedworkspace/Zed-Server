import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as inviteServices from '../services/inviteServices';

export const generateInviteLink =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;
    const { userId } = req.body;
    const inviteLink = await inviteServices.generateInviteLink(projectId, userId);
    res.status(200).json({
        status: "success",
        message: "Invite link generated successfully",
        inviteLink,
    });
})