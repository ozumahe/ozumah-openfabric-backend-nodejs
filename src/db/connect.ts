import mongoose from "mongoose";

const connectMongooseDB = (url: string) => {
  return mongoose.connect(url);
};

export default connectMongooseDB;
