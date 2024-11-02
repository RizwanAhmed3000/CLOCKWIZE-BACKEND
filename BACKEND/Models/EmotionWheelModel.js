import mongoose from "mongoose";
import { Schema } from "mongoose";

const EmotionWheelSchema = new Schema(
    {
        residentId: {
            type: String,
            required: true,
        },
        currentTime: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        emotion: {
            type: String,
            // required: true
        },

    },
    { timestamps: true }
);

export default mongoose.model("EmotionWheel", EmotionWheelSchema);


