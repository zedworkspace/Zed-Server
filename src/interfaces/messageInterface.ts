import mongoose from "mongoose";

export interface IMessage {
    channelId: mongoose.Types.ObjectId
    senderId: mongoose.Types.ObjectId
    content: string
    fileUrl:string;
    type:string
    createdAt: Date
    readBy: [mongoose.Types.ObjectId]
}