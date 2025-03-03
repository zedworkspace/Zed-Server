import express from "express";
import { getBoardById, getProjectBoards } from "../controllers/boardContollers";

const boardRouter = express.Router();

boardRouter.route("/:projectId").get(getProjectBoards);
boardRouter.route("/:projectId/:boardId").get(getBoardById);

export default boardRouter;
