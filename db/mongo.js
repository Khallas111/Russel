const mongoose = require("mongoose");

exports.initClientDbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};
