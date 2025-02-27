import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";


const userSchema: Schema<IUser> = new Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String},
    profileImg:{type:String},
    bio:{type:String},
    bannerImg:{type:String},
    gitHubId:{type:String},
    googleId:{type:String},
    servers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Server" }],
});

const User = mongoose.model <IUser> ('User',userSchema);
export default User;