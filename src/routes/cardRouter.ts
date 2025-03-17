import express from "express";
import {
  createCardByListId,
  editCardById,
  getCardById,
  updateCardPositionInDiffLists,
  updateCardPositionInSameList,
} from "../controllers/cardControllers";

const cardRouter = express.Router();

cardRouter.route("/reorder").post(updateCardPositionInSameList);
cardRouter.route("/reorder-between-lists").post(updateCardPositionInDiffLists);
cardRouter.route("/:listId").post(createCardByListId);
cardRouter.route("/:cardId").get(getCardById);
cardRouter.route("/:cardId/edit/:projectId").put(editCardById)

export default cardRouter;
