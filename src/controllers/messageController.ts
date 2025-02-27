import { getIO } from "../utils/socket";
import *as messageService from '../services/messageServices'
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const sendMessage = catchAsync (async (req:Request, res:Response) => {
    const { channelId, senderId, content, type } = req.body;
    const message = await messageService.sendMessage({channelId, senderId, content, type});

    const io = getIO();
    io.to(channelId).emit("receiveMessage", message);

    res.status(201).json({ message: "Message sent successfully", data: message });

})

export const getMessagesByChannel = catchAsync(async (req : Request, res : Response) => {
    const { channelId } = req.params;
    const messages = await messageService.getMessagesByChannel(channelId);

    res.status(200).json({ messages });

}) 
