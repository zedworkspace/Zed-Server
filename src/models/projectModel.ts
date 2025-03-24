import mongoose, { Schema } from "mongoose";
import { IProject } from "../interfaces/projectInterface";

const projectSchema : Schema<IProject> = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String,  default: "" },
  banner:{type:String , default:""},
  logo: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  repo: { type: Array },
});

const Project = mongoose.model<IProject>("Project", projectSchema);
export default Project;