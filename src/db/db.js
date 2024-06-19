import {DBNAME} from '../constants.js';
import mongoose from 'mongoose';

export const connectToDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`);
        console.log(connectionInstance.connection.host);
    } catch (error) {
        console.log(error);
    }
};