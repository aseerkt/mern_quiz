const mongoose = require('mongoose');

// dotenv config
require('dotenv').config();

const URI = process.env.MONGO_LOCAL_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
