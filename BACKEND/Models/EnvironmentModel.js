import mongoose from "mongoose";
import { Schema } from "mongoose";

const environmentTagsSchema = new Schema(
  {
    tagName: {
      type: String,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("environment", environmentTagsSchema);


