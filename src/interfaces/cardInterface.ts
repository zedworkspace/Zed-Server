import mongoose from "mongoose";
import { Profile } from "./profileInterface";

export interface ICard {
  listId: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  labels?: string[];
  dueDate?: Date;
  assignees?: Profile[];
  position: number;
  status: string;
}

export interface IUpdateCardPositionInDnd {
  fromListId: string;
  cardId: string;
  toListId: string;
  boardId: string;
}

export interface IUpdateCardPositionInSameListBody {
  listId: string;
  fromCardId: string;
  toCardId: string;
}

export interface IUpdateCardPositionInDiffListsBody {
  fromListId: string;
  toListId: string;
  fromCardId: string;
  toCardId: string;
}
export interface ICreateCard {
  listId: string;
  body: { title: string };
  userId: string;
}
