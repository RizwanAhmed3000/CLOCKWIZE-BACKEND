import mongoose from "mongoose";
import { Schema } from "mongoose";

const peopleTagsSchema = new Schema(
  {
    tagName: {
      type: String,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("people", peopleTagsSchema);


