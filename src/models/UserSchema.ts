import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import { User } from "../utils/types";

const UserShema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "Please provide user name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Provide user email"],
    validate: {
      validator: validator.isEmail,
      message: "Please Provide email",
    },
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserShema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

UserShema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model<User>("User", UserShema);
