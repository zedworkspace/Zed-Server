import express from "express";
import {
  createListByBoardId,
  getListsByBoardId,
  updateListPositions,
} from "../controllers/listControllers";

const listRouter = express.Router();

listRouter.post("/reorder", updateListPositions);
listRouter.route("/:boardId").post(createListByBoardId).get(getListsByBoardId);

export default listRouter;
