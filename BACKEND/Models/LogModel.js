import mongoose from "mongoose";
import { Schema } from "mongoose";

const LogSchema = new Schema(
    {
        residentId: {
            type: String,
            // required: true,
        },
        people: {
            type: [String],
            // required: true,
        },
        activity: {
            type: [String],
            // required: true,
        },
        environment: {
            type: [String],
            // required: true,
        },
        note: {
            type: [String],
            // required: true
        },
        currentTime: {
            type: String,
            required: true
        },
        mood: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("log", LogSchema);

// create , update , delete , get all logs