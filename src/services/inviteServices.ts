import mongoose from "mongoose";
import Invite from "../models/inviteModel";
import Member from "../models/memberModel";
import Project from "../models/projectModel";
import CustomError from "../utils/CustomError";
import { v4 as uuidv4 } from "uuid";
import nodemailer from 'nodemailer';
import { config } from '../configs/config';



export const generateInviteLink = async (projectId: string, userId: mongoose.Types.ObjectId) => {

    const project = await Project.findById(projectId);
    if (!project) throw new CustomError("Project not found", 404);

    if (project.owner.toString() !== userId.toString()) {
        throw new CustomError("User does not have permission to invite", 403);
        // const member = await Member.findOne({ projectId, userId }).populate({
        //     path: "roles",
        //     select: "permissions"
        // });

        // if (!member) {
        //     throw new CustomError("User does not have permission to invite", 403);
        // }

        // const permissions = new Set(member.roles.flatMap((role: any) => role.permissions));
        // if (!permissions.has("INVITE_MEMBERS") && !permissions.has("ADMINISTRATION")) {
        //     throw new CustomError("User does not have permission to invite", 403);
        // }
    }

    const existingInvite = await Invite.findOne({ projectId, generatedBy: userId, expirationDate: { $gt: new Date() } });
    if (existingInvite) {
        return `${config.FRONTEND_URL}/invite/${existingInvite.inviteLink}`;
    }

    const inviteLink = uuidv4();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    const newInvite = new Invite({ projectId, inviteLink, generatedBy: userId, expirationDate });
    await newInvite.save();

    return `${config.FRONTEND_URL}/invite/${inviteLink}`;
};


export const sendInviteEmail = async (email: string, inviteLink: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.EMAIL, 
            pass: config.APP_PASSWORD,
        },
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "You're invited to join a project on Zed!",
        html: `<p>Hello,</p>
        <p>You have been invited to join a project on Zed.</p>
        <p>Click the link below to join:</p>
        <a href="${inviteLink}">${inviteLink}</a>
        <p>This link expires in 7 days.</p>`,
    };
    
    await transporter.sendMail(mailOptions);
    
    return inviteLink;
}


export const acceptInvite = async ( userId: mongoose.Types.ObjectId, inviteLink: string ) => {
    const invite = await Invite.findOne({ inviteLink });
    
    if (!invite) {
        throw new CustomError("Invalid invite link", 400);
    }

    if (invite.expirationDate < new Date()) {
        throw new CustomError("Invite link has expired", 400);
    }

    const existingMember = await Member.findOne({ projectId: invite.projectId, userId });
    if (existingMember?.status === "active") {
        throw new CustomError("User is already a member of this server", 400);
    }

    if (existingMember?.status === "left") {
        
        existingMember.status = "active";
        existingMember.leftAt = null;

        await existingMember.save();
        return { message: "Invite accepted successfully, user added to the project" };
    }

    const newMember = new Member({
        projectId: invite.projectId,
        userId,
        roles: [],
    });
    await newMember.save();

    await Project.findByIdAndUpdate(invite.projectId, {
        $push: { members: newMember._id },
    });

    return { message: "Invite accepted successfully, user added to the project" };
}


export const getInviteInfo = async (userId: mongoose.Types.ObjectId, inviteLink: string) => {
    const invite = await Invite.findOne({ inviteLink });

    if (!invite) {
        throw new CustomError("Invalid invite link", 400);
    }

    if (invite.expirationDate < new Date()) {
        throw new CustomError("Invite link has expired", 400);
    }

    const project = await Project.findById(invite.projectId).populate("owner", "name email");

    if (!project) {
        throw new CustomError("Project not found", 404);
    }

    if (project.owner.toString() === userId.toString()) {
        return { redirectToProject: true, projectId: project._id };
    }

    const isMember = await Member.findOne({ projectId: project._id, userId, status: "active" });

    if (isMember) {
        return { redirectToProject: true, projectId: project._id };
    }

    return {
        name: project.name,
        description: project.description,
        logo: project.logo,
        owner: project.owner,
        projectId: project._id,
        redirectToProject: false,
    };
};