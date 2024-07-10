import mongoose from "mongoose";
import { flightListings, userListings } from "./data.js";
import Flight from "../models/flights.js";
import User from '../models/users.js';

const MONGO_URL = "mongodb://127.0.0.1:27017/Real-Time-Flight-Booking-App"
// const MONGO_URL = "<YOUR atlas MONGO URL FROM ENV>";

async function main(){
    await mongoose.connect(MONGO_URL)
}

main().then((data)=>{
    console.log("Connected to DB")
}).catch((err)=>console.log(err))

const initDB = async()=>{
    await Flight.deleteMany({})
    await User.deleteMany({})
    await Flight.insertMany(flightListings)
    await User.insertMany(userListings)
}

initDB().then(()=>{
    console.log("Database initialized")
}).catch((err)=>console.log(err))