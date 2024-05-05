import mongoose from "mongoose";
import { Schema } from "mongoose";

const photosSchema = new Schema(
    {
        residentId: {
            type: String,
            // required: true,
        },
        photos: {
            type: [String],
        },
        albumName: {
            type: [String],
            default : 'New Folder'
        },
       
    },
    { timestamps: true }
);

export default mongoose.model("photos", photosSchema);

// create , update , delete , get all logs