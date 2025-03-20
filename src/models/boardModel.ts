import mongoose, { Schema } from "mongoose";
import { IBoard } from "../interfaces/boardInterface";

const boardSchema: Schema<IBoard> = new Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    name: { type: String, required: true },

    allowedRoles: [
      "everyOne",
      { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    ],
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Board = mongoose.model<IBoard>("Boards", boardSchema);
export default Board;
