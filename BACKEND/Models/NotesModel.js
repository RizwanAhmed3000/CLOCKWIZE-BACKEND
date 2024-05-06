import mongoose from "mongoose";
import { Schema } from "mongoose";

const NotesSchema = new Schema(
    {
        residentId: {
            type: String,
            required: true,
        },
        type: {
            type: String
        },
        RAGRating: {
            type: String
        },
        professionalName: {
            type: String
        },
        Emotions: {
            type: [String],
        },
        note: {
            type: [String],
            // required: true
        },
        date: {
            type: String,
            // required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Note", NotesSchema);
// same work 