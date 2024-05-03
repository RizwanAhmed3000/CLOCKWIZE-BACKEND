import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isCareManager: {
      type: Boolean,
      default: false,
    },
    isCarer: {
      type: Boolean,
      default: false,
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
