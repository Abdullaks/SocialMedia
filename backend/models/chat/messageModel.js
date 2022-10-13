// const mongoose = require("mongoose");

// const { ObjectId } = mongoose.Schema;

// const messageSchema = mongoose.Schema(
//   {
//     sender: {
//       type: ObjectId,
//       ref: "User",
//     },
//     content: {
//       type: String,
//       trim: true,
//     },
//     chat: {
//       type: ObjectId,
//       ref: "Chat",
//     },
//     readBy: [
//       {
//         type: ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model("Message", messageSchema);
// module.exports = Message;
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);