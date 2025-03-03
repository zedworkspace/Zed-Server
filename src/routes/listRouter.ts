import express from "express";
import { createListByBoardId } from "../controllers/listControllers";

const listRouter = express.Router();

listRouter.route("/:boardId").post(createListByBoardId);

export default listRouter;
