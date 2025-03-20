import mongoose, { Schema } from "mongoose";
import { IChannel } from "../interfaces/channelInterface";

const channelSchema: Schema<IChannel> = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  channelMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChannelMembers",
    },
  ],
  name: { type: String, required: true },
  type: { type: String, required: true }, //voice or text
  description: { type: String },
  allowedRoles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Channel = mongoose.model<IChannel>("Channel", channelSchema);
export default Channel;
