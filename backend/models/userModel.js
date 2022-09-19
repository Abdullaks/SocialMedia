const mongoose = require("mongoose");

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
    //   required: [true, "please Add a name"],
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
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc:{
      type: String, 
      max:50,
    },
    city:{
      type: String,
      max:50,
    },
    from:{
      type: String,
      max:50,
    },
    relationship:{
      type:Number,
      enum:[1, 2, 3]
    },
    isBlock:{
      type:Boolean,
     default: false,
    },
  },
  {
    timestamps: true,
  }
);
                      


module.exports = mongoose.model("User", userSchema);
