import mongoose, { Schema } from "mongoose";
import { INotification } from "../interfaces/notificationInterface";

const notificationSchema: Schema <INotification> = new mongoose.Schema({
    channelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    },
    isRead: {
        type: Boolean,
        default: false
    }
})

const Notification = mongoose.model('Notification',notificationSchema)

export default Notification