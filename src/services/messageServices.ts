import { IMessage } from "../interfaces/messageInterface";
import Message from "../models/messageModel";
import CustomError from "../utils/CustomError";

// Send a new message
export const sendMessage = async ({channelId, senderId, content, type} : {channelId: string , senderId: string, content: string, type: string} ) => {
  if (!channelId || !senderId || !content) {
    throw new CustomError("Channel ID, Sender ID, and Content are required.",404);
  }

  const message = new Message({
    channelId ,
    senderId,
    content,
    type,
  });

  return await message.save();
};

// Get messages from a channel
export const getMessagesByChannel = async (channelId:string) => {
  return await Message.find({ channelId }).populate('senderId', 'name profileImg' );
};
