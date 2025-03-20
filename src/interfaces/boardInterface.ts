import mongoose from "mongoose";

export interface IBoard {
  name: string;
  projectId: mongoose.Schema.Types.ObjectId;
  boardMembers: mongoose.Schema.Types.ObjectId[];
  allowedRoles: mongoose.Types.ObjectId[];
  isDefault: boolean;
}
