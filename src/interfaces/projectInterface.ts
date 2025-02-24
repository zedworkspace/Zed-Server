import mongoose from "mongoose";
export interface IProject{
  name: string;
  description?: string;
  logo: string;
  owner: mongoose.Types.ObjectId | string;
  repo?: string[];
}
