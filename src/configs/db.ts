import mongoose from 'mongoose';
import {config} from './config';

// Database connection
export const connectDB = async () => {
    try{
        const connect = await mongoose.connect(config.MONGO_URI as string);
        console.log(`MongoDB Connected : ${connect.connection.host}`);
    }catch(error){
        console.log(error);
    }
}