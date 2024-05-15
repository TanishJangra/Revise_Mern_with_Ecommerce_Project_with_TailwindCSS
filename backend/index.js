require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/index.js')
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));    
app.use(express.json());
app.use(cookieParser())
app.use("/api", router);

const PORT =process.env.PORT || 8080;
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Connected to db");
        console.log("Server starts")
    })
})