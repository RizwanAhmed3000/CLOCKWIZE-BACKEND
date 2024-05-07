import mongoose from "mongoose";
import { Schema } from "mongoose";

const PerfectDaySchema = new Schema(
  {
    residentId: {
      type: String,
    },
    loginId: {
      type: String,
    },
    timing: {
      type: String,
    },
    activity: {
      type: String,
    },
    person: {
      type: String,
    },
    environment: {
      type: String,
    },
  },
  { timeStamps: true }
);

export default mongoose.model("perfect Day", PerfectDaySchema);
