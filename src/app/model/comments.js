// models/Comments.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Comments || mongoose.model("Comments", CommentSchema);
