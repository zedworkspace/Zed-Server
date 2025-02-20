import Invite from "../models/inviteModel";
import Project from "../models/projectModel";
import CustomError from "../utils/CustomError";
import { v4 as uuidv4 } from "uuid";

export const generateInviteLink = async (projectId:string, userId:string) => {

    const project = await Project.findById(projectId);
    if(!project) throw new CustomError("Project not found",404);

    if(userId !== project.projectOwner && !project.projectMembers.includes(userId)){
        throw new CustomError("User have no permission to invite",404);
    }

    const existingInvite = await Invite.findOne({ projectId, generatedBy: userId, expirationDate: { $gt: new Date() } });
    if (existingInvite) {
        const fullInviteLink = `http://localhost:3000/invite/${existingInvite.inviteLink}`;
        return fullInviteLink;
    }

    const inviteLink = uuidv4();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    const newInvite = new Invite({ projectId, inviteLink, generatedBy: userId, expirationDate });
    await newInvite.save();
    const fullInviteLink = `http://localhost:3000/invite/${inviteLink}`;
    
    return fullInviteLink;
}