import mongoose, { Document } from "mongoose";

export interface IUser extends Document{
    _id: mongoose.Types.ObjectId;
    name:string;
    email:string;
    password?:string;
    profileImg?:string;
    bannerImg?:string;
    gitId?:string;
    googleId?:string;
    createdAt:string;
}