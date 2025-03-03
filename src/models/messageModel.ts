import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interfaces/messageInterface";

const messageSchema : Schema <IMessage> = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: false },
  fileUrl: { type: String, required: false },
  type: { type: String, enum: ["text", "image", "video"], default: "text" },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model <IMessage> ("Message", messageSchema);
export default Message;
