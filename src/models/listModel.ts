import mongoose from "mongoose";
import { IList } from "../interfaces/listInterface";

const listSchema = new mongoose.Schema<IList>({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: { type: Number, required: true },
  color: { type: String },
  isDeleted: { type: Boolean, default: false },
});

const List = mongoose.model("Lists", listSchema);
export default List;
