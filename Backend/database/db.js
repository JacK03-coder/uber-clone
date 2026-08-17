const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("mongoDB connected successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
