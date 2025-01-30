import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./api/routes.js"
import cors from "cors"
import { cloudinaryConfig } from './config/cloudinaryConfig.js';

const app = express() 

// configure env
dotenv.config({path : "./config.env"})
const port = process.env.PORT || 8010 

// MongoDB connection
const DB = process.env.DB
mongoose.connect(DB).then(()=>{
  console.log("DB connected!")
}).catch((e)=>{console.log(e.message)})

// JSON body parser and cors
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))

//Cloudinary Config
cloudinaryConfig()

// my api end points 
app.use(router)


app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})