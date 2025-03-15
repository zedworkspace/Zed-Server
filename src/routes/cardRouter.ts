import express from "express";
import { createCardByListId, editCardById, getCardById } from "../controllers/cardControllers";

const cardRouter = express.Router();

cardRouter.route("/:listId").post(createCardByListId);
cardRouter.route("/:cardId").get(getCardById);
cardRouter.route("/:cardId/edit/:projectId").put(editCardById)

export default cardRouter;
