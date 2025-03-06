import { getIO } from "../utils/socket";
import *as messageService from '../services/messageServices'
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { IUser } from "../interfaces/userInterface";

export const sendMessage = catchAsync (async (req:Request, res:Response) => {
    const { channelId, senderId, content, type } = req.body;
    const message = await messageService.sendMessage({channelId, senderId, content, type});

    const io = getIO();
    io.to(channelId).emit("receiveMessage", message);

    res.status(201).json({ message: "Message sent successfully", data: message });

})

export const sendFile = catchAsync(async (req: Request, res: Response) => {
    const { channelId } = req.body
    const  senderId  = req.user as IUser
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const messageData = {
        file:req.file.path,
        channelId:channelId,
        senderId: senderId._id
    }
    const fileUrl = await messageService.sendFile(messageData);
    res.status(200).json({ fileUrl });
  });



export const getMessagesByChannel = catchAsync(async (req : Request, res : Response) => {
    const { channelId } = req.params;
    const messages = await messageService.getMessagesByChannel(channelId);

    res.status(200).json({ messages });
}) 


export const unReadMessages = catchAsync (async (req: Request, res:Response) =>{
  const user = req.user as IUser
  const messages = await messageService.unReadMessages(user._id)
  res.status(200).json(messages)
})


export const readMessage = catchAsync (async (req: Request, res: Response) => {
  const user = req.user as IUser
  const { channelId } = req.params
  
  const readMessage = await messageService.readMessage(user._id, channelId)
  res.status(201).json({readMessage})
})
