import mongoose from "mongoose";
import { Schema } from "mongoose";

const FamilySchema = new Schema(
  {
    residentId: {
      type: String,
      required: true,
    },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    relationship: { type: String, required: true },
    photo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Family", FamilySchema);
