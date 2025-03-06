import express from "express";
import { createCardByListId, getCardById } from "../controllers/cardControllers";

const cardRouter = express.Router();

cardRouter.route("/:listId").post(createCardByListId);
cardRouter.route("/:cardId").get(getCardById);

export default cardRouter;
