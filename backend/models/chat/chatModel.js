// const mongoose = require("mongoose");

// const { ObjectId } = mongoose.Schema;

// const chatSchema = mongoose.Schema(
//   {
//     chatName: {
//       type: String,
//       trim: true,
//     },
//     isGroupChat: {
//       type: Boolean,
//       default: false,
//     },
//     users: [
//       {
//         type: ObjectId,
//         ref: "User",
//       },
//     ],
//     latestMessage: {
//       type: ObjectId,
//       ref: "Message",
//     },
//     groupAdmin: {
//       type: ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// const Chat = mongoose.model("Chat", chatSchema);

// module.exports = Chat;


const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);