const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["profilePicture", "cover", null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    background: {
      type: String,
    },
    


  },
  {
    toJSON:{
      virtuals:true
  },
  toObject:{
      virtuals:true,
  },
    timestamps: true,
  },
  
);

module.exports = mongoose.model("Post", postSchema);



// virtual methode to populate 


postSchema.virtual("Comment", {
    ref:"Comment",
    foreignField:"postId",
    localField:"_id"
  })


