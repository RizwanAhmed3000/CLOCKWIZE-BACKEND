import mongoose from "mongoose";
import { Schema } from "mongoose";

const careManagerSchema = new Schema(
    {
        // residentId: {
        //     type: String,
        //     // required: true,
        // },
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
        },
        
        currentTime: {
            type: String,
            // required: true
        },
        
    },
    { timestamps: true }
);

export default mongoose.model("careManager", careManagerSchema);

// create , update , delete , get all logs