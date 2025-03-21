import express from "express";
import { userAuth } from "../middlewares/userAuth";
import { getActivitiesByEntityId } from "../controllers/activityControllers";

const activityRouter = express.Router();

activityRouter.use(userAuth);

activityRouter.route("/:entityId").get(getActivitiesByEntityId);

export default activityRouter;
