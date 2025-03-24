import express from "express";
import {
  createCardByListId,
  deleteCardById,
  editCardById,
  getCardById,
  updateCardPositionInDiffLists,
  updateCardPositionInDnd,
  updateCardPositionInSameList,
} from "../controllers/cardControllers";
import { userAuth } from "../middlewares/userAuth";

const cardRouter = express.Router();

cardRouter.use(userAuth);
cardRouter.route("/reorder/same-list").post(updateCardPositionInSameList);
cardRouter.route("/reorder/dnd").post(updateCardPositionInDnd);
cardRouter.route("/reorder/diffrent-list").post(updateCardPositionInDiffLists);
cardRouter.route("/:listId").post(createCardByListId);
cardRouter.route("/:cardId").get(getCardById).delete(deleteCardById)
cardRouter.route("/:cardId/edit/:projectId").put(editCardById);

export default cardRouter;
