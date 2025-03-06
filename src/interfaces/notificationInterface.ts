import mongoose from "mongoose";

export interface INotification {
    channelId : mongoose.Types.ObjectId;
    isRead: boolean
}