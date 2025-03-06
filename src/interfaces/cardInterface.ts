import mongoose from "mongoose";
import { Profile } from "./profileInterface";

export interface ICard {
  listId: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  labels?: string[];
  dueDate?: Date;
  assignees?: Profile[];
}
