import mongoose from "mongoose";
import { Schema } from "mongoose";

const ActivityTagsSchema = new Schema(
  {
    tagName: {
      type: String,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("activity", ActivityTagsSchema);


