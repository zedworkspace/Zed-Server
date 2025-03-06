import express from "express";
import { getProjectBoards } from "../controllers/boardContollers";

const boardRouter = express.Router();

boardRouter.route("/:projectId").get(getProjectBoards);

export default boardRouter;
