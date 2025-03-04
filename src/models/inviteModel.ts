import mongoose, { Schema, Document } from "mongoose";
import { IInvite } from "../interfaces/inviteInterface";

const InviteSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  inviteLink: { type: String, required: true, unique: true },
  generatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  expirationDate: { type: Date, required: true, index: { expires: "7d" } }
});

const Invite = mongoose.model<IInvite>("Invite", InviteSchema);
export default Invite;