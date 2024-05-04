import mongoose from "mongoose";
import { Schema } from "mongoose";

const PlaylistSchema = new Schema(
  {
    residentId: {
      type: String,
      required: true,
    },
    playlistLink: {
      type: [String],
    },
    playlistName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", PlaylistSchema);
