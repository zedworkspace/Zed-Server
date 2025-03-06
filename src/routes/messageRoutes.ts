import express, { Router } from "express";
import { getMessagesByChannel, readMessage, sendFile, sendMessage, unReadMessages } from "../controllers/messageController";
import upload from "../middlewares/imageUploadingMiddleware";
import { userAuth } from "../middlewares/userAuth";

const messageRouter:Router = express.Router();

messageRouter.post("/messages/send", sendMessage);
messageRouter.post('/messages/file', userAuth,upload.single("fileMessage"),sendFile)
messageRouter.get("/messages/:channelId", getMessagesByChannel);
messageRouter.get('/messages/get/unread',userAuth,unReadMessages)
messageRouter.put('/messages/read/:channelId',userAuth,readMessage)

export default messageRouter;
