import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as inviteServices from '../services/inviteServices';
import CustomError from "../utils/CustomError";

export const generateInviteLink =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { projectId } = req.params;
    if(!user?._id) throw new CustomError("userid not found", 400);
    const inviteLink = await inviteServices.generateInviteLink(projectId, user._id);
    res.status(200).json({
        status: "success",
        message: "Invite link generated successfully",
        inviteLink,
    });
})

export const sendInviteEmail =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email, inviteLink} = req.body;
    const response = await inviteServices.sendInviteEmail( email, inviteLink );
    res.status(200).json({
        status: "success",
        message: "Invite link sended to the given email successfully",
        inviteLink
    });
})

export const acceptInvite =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) throw new CustomError("User ID not found", 400);
    const {inviteLink} = req.body;
    const response = await inviteServices.acceptInvite( req.user._id, inviteLink );
    res.status(200).json({
        status: "success",
        message: response.message,
    });
})

export const getInviteInfo =  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?._id) throw new CustomError("User ID not found", 400);
    const {inviteLink} = req.params;
    const project = await inviteServices.getInviteInfo( req.user._id, inviteLink );
    res.status(200).json({
        status: "success",
        message: "Invite Info fetch successfully",
        project
    });
})
