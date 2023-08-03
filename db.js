import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const connection = async () => {
    const URL = process.env.MONGO_URI;
    try{
        await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database connected successfully");
    }
    catch(error){
        console.log("Error while connecting to database",error.message)
    }
}

export default connection;