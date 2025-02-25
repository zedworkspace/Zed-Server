import mongoose from "mongoose";

export interface IChannel {
    name: string;
    projectId: mongoose.Types.ObjectId;
    type: string;
    description: string;
    allowedRoles: mongoose.Types.ObjectId;
    createdAt: Date
    updatedAt: Date
}