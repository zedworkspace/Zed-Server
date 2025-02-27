import mongoose from "mongoose";

export interface IMessage {
    channelId: mongoose.Types.ObjectId
    senderId: mongoose.Types.ObjectId
    content: string
    type:string
    createdAt: Date
}