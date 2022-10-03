const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    name: {
      type: String,
      // trim: true,
      // required: true,
      text: true,
    },
    email: {
      type: String,
      required: [true, "please Add an email"],
      unique: true,
    },
    mobile: {
      type: String,
      required: [true, "please Add a phone number"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please Add a password"],
      min: 8,
    },
    profilePicture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
    coverPicture: {
      type: String,
      trim: true,
      default: "",
    },
    bio: {
      type: String,
    },

    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      age: {
        type: Number,
      },
      gender: {
        type: String,
        trim: true,
      },
      workplace: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married"],
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    isBlock: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
