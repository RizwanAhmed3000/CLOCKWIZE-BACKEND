import mongoose from "mongoose";
import { Schema } from "mongoose";

const EmotionTagsSchema = new Schema(
  {
    tagName: {
      type: String,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("emotion", EmotionTagsSchema);


