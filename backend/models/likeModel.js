const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    Post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "PostId Id is required"],
    },
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User  is required"],
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    likedtAt: {
      type: Date,
      default: new Date(),
    }
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
