import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(process.env.MONGODB_URL)

// console.log(process.env.MONGODB_URL)
