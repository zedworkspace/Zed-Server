import mongoose from "mongoose";
import { ICard } from "../interfaces/cardInterface";

const CardSchema = new mongoose.Schema<ICard>({
  listId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  labels: [{ type: String }],
  assignees: [{ type: Object, ref: "User" }],
  position: { type: Number, required: true },
  status: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

const Card = mongoose.model("Cards", CardSchema);
export default Card;
