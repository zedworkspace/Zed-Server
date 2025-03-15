import mongoose from "mongoose";
import { IUser } from "./userInterface";

export interface IMember {
    projectId: mongoose.Types.ObjectId,
    userId: IUser,
    roles: mongoose.Types.ObjectId[]
}