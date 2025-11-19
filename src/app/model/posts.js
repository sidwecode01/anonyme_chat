// models/Posts.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    image_path: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Posts || mongoose.model("Posts", PostSchema);