import express from "express";
import { getBoardById, getProjectBoards,createBoard } from "../controllers/boardContollers";

const boardRouter = express.Router();

boardRouter.route("/:projectId").get(getProjectBoards);
boardRouter.route("/:projectId/:boardId").get(getBoardById);
boardRouter.route("/create").post(createBoard)

export default boardRouter;
