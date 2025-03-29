const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management');
    console.log("MongoDB connected successfully");
  } catch (e) {
    console.error("MongoDB connection error:", e);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;