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
});

const List = mongoose.model("lists", listSchema);
export default List;
