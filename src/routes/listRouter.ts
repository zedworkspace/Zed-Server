import express from "express";
import {
  createListByBoardId,
  getListsByBoardId,
  softDeleteById,
  updateListPositions,
} from "../controllers/listControllers";

const listRouter = express.Router();

listRouter.post("/reorder", updateListPositions);
listRouter.route("/:boardId").post(createListByBoardId).get(getListsByBoardId);
listRouter.route("/:listId").delete(softDeleteById);
export default listRouter;
