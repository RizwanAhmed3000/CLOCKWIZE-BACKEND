import mongoose from "mongoose";
import { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    isAdmin: {
        type : Boolean,
        default : true
    }
  },
  { timestamps: true }
);

export default mongoose.model("admin", adminSchema);

// create , update , delete , get all logs
