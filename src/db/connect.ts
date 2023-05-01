const mongoose = require("mongoose");

const connectDB = (url: string | undefined) => {
  return mongoose.connect(url);
};

export default connectDB;
