import express from "express";
import {
  createListByBoardId,
  getListsByBoardId,
} from "../controllers/listControllers";

const listRouter = express.Router();

listRouter.route("/:boardId").post(createListByBoardId).get(getListsByBoardId);

export default listRouter;
