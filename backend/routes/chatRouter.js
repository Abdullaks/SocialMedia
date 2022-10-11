const express = require("express");
const {
  newconversation,
  getConversation,
  newmessage,
  allmessage,
} = require("../controllers/chatController");
const { verifyUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyUser, newconversation);
router.get("/:userId", verifyUser, getConversation);
router.post("/newMessage", verifyUser, newmessage);
router.get("/allMessage/:conversationId", verifyUser, allmessage);

 
module.exports = router;
