import { Document } from "mongoose";

export interface IInvite extends Document {
  serverId: string;
  inviteLink: string;
  generatedBy: string;
  expirationDate: Date;
}