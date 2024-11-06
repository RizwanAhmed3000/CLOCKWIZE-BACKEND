import mongoose from "mongoose";
import { Schema } from "mongoose";

const InterestSchema = new Schema(
    {
        residentId: {
            type: String,
            required: true,
        },
        interest: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

export default mongoose.model("Interest", InterestSchema);


