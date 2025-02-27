import mongoose from "mongoose";

export interface IChannel {
  _id: mongoose.Types.ObjectId;
  name: string;
  projectId: mongoose.Types.ObjectId;
  type: string;
  description: string;
  allowedRoles: mongoose.Types.ObjectId;
  channelMembers: mongoose.Types.ObjectId[]
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}
