import mongoose from "mongoose";

export interface IList {
  boardId: mongoose.Schema.Types.ObjectId;
  name: string;
  position: number;
  color: string;
  isDeleted: boolean;
}
