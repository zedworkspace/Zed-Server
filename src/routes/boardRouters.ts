import express from "express";
import {
  getBoardById,
  getProjectBoards,
  createBoard,
  getMembersByRoles,
} from "../controllers/boardContollers";
import { userAuth } from "../middlewares/userAuth";

const boardRouter = express.Router();

boardRouter.use(userAuth)
boardRouter.route("/members/:boardId").get(getMembersByRoles);
boardRouter.route("/create").post(createBoard);
boardRouter.route("/:projectId").get(getProjectBoards);
boardRouter.route("/:projectId/:boardId").get(getBoardById);

export default boardRouter;
