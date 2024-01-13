/*-----import library and module----*/
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
/*----------------end-----------------*/

// use express framework from library
const app = express();
app.use(bodyParser.json());
app.use(cors());

// use dotenv for secure important link 
dotenv.config();

// server PORT connection
const PORT = process.env.PORT || 8080;

// mongodb url connection
const URL = process.env.MONGOURL;

// database mongodb connection
mongoose.connect(URL).then(()=>{
    console.log("Database connected...");

// server connection
    app.listen(PORT, ()=>{
        console.log(`server is running on PORT: ${PORT}`);
    })

}).catch(error => console.log(error));


// api
app.use("/api",route);




