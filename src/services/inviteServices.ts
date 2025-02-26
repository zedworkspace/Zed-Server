import mongoose from "mongoose";
import Invite from "../models/inviteModel";
import Member from "../models/memberModel";
import Project from "../models/projectModel";
import CustomError from "../utils/CustomError";
import { v4 as uuidv4 } from "uuid";

export const generateInviteLink = async (projectId: string, userId: mongoose.Types.ObjectId) => {

    const project = await Project.findById(projectId);
    if (!project) throw new CustomError("Project not found", 404);

    if (project.owner.toString() !== userId.toString()) {
        const member = await Member.findOne({ projectId, userId }).populate({
            path: "roles",
            select: "permissions"
        });

        if (!member) {
            throw new CustomError("User does not have permission to invite", 403);
        }

        // const permissions = new Set(member.roles.flatMap((role: any) => role.permissions));
        // if (!permissions.has("INVITE_MEMBERS") && !permissions.has("ADMINISTRATION")) {
        //     throw new CustomError("User does not have permission to invite", 403);
        // }
    }

    const existingInvite = await Invite.findOne({ projectId, generatedBy: userId, expirationDate: { $gt: new Date() } });
    if (existingInvite) {
        return `http://localhost:3000/invite/${existingInvite.inviteLink}`;
    }

    const inviteLink = uuidv4();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    const newInvite = new Invite({ projectId, inviteLink, generatedBy: userId, expirationDate });
    await newInvite.save();

    return `http://localhost:3000/invite/${inviteLink}`;
};
