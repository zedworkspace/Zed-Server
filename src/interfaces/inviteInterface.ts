import { Document } from "mongoose";

export interface IInvite extends Document {
  projectId: string;
  inviteLink: string;
  generatedBy: string;
  expirationDate: Date;
}