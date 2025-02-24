import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as inviteServices from '../services/inviteServices';
import { IUser } from "../interfaces/userInterface";
import CustomError from "../utils/CustomError";
interface AuthenticatedRequest extends Request {
    user?: IUser;
}
export const generateInviteLink =  catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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