const mongoose = require('mongoose');
 
require('dotenv').config();
const mongo_url = process.env.MONGODB_URI;

mongoose.connect(mongo_url).then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.log("MongoDB connection failed", error);
});