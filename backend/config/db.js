const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to db...")
    } catch (error) {
        console.log("ERRor in connecting to db",error);
    }
}

module.exports = connectDB;