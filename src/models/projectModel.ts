import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  ProjectDescription: {
    type: String,
  },
  projectLogo: {
    type: String,
    required: true,
  },
  projectMembers: {
    type: Array,
  },
  projectOwner: {
    type: String,
  },
  projectRepo: {
    type: Array,
  },
});

const Project = mongoose.model("projects", projectSchema);
export default Project;
