import express, { Router } from "express";
import { getMessagesByChannel, sendMessage } from "../controllers/messageController";

const messageRouter:Router = express.Router();

messageRouter.post("/messages/send", sendMessage);
messageRouter.get("/messages/:channelId", getMessagesByChannel);

export default messageRouter;
