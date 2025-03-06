import express, { Router } from "express";
import { userAuth } from "../middlewares/userAuth";
import { acceptInvite, generateInviteLink, getInviteInfo, sendInviteEmail } from "../controllers/inviteControllers";
const inviteRouter: Router = express.Router();

inviteRouter.get("/:inviteLink", userAuth, getInviteInfo);
inviteRouter.get("/generate-invite/:projectId", userAuth, generateInviteLink);
inviteRouter.post("/send-invite", userAuth, sendInviteEmail);
inviteRouter.post("/accept-invite", userAuth, acceptInvite);

export default inviteRouter;