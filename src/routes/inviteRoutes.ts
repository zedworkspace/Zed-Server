import express, { Router } from "express";
import { userAuth } from "../middlewares/userAuth";
import { acceptInvite, generateInviteLink, getInviteInfo, sendInviteEmail } from "../controllers/inviteControllers";
const inviteRouter: Router = express.Router();

inviteRouter.get("/generate-invite/:projectId", userAuth, generateInviteLink);
inviteRouter.post("/send-invite", userAuth, sendInviteEmail);
inviteRouter.post("/accept-invite", userAuth, acceptInvite);
inviteRouter.get("/invite", userAuth, getInviteInfo);

export default inviteRouter;