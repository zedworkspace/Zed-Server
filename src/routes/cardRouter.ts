import express from "express";
import { createCardByListId } from "../controllers/cardControllers";

const cardRouter = express.Router();

cardRouter.route("/:listId").post(createCardByListId);

export default cardRouter;
