import express, { Router } from "express";
import { getMessagesByChannel, sendFile, sendMessage } from "../controllers/messageController";
import upload from "../middlewares/imageUploadingMiddleware";
import { userAuth } from "../middlewares/userAuth";

const messageRouter:Router = express.Router();

messageRouter.post("/messages/send", sendMessage);
messageRouter.post('/messages/file', userAuth,upload.single("fileMessage"),sendFile)
messageRouter.get("/messages/:channelId", getMessagesByChannel);

export default messageRouter;
