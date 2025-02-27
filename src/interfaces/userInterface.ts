import mongoose, { Document } from "mongoose";

export interface IUser extends Document{
    _id: mongoose.Types.ObjectId;
    name:string;
    email:string;
    password?:string;
    profileImg?:string;
    bio:string;
    bannerImg?:string;
    gitHubId?:string;
    googleId?:string;
    createdAt:string;
    servers: mongoose.Types.ObjectId[]
}
