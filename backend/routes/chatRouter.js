const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,    
  renameGroup,
} = require("../controllers/chatController");
const { verifyUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",verifyUser, accessChat);
router.get("/", verifyUser, fetchChats);
router.post("/createGroup", verifyUser, createGroupChat);
router.put("/renameGroup",verifyUser, renameGroup);
router.put("/groupadd",verifyUser, addToGroup);
router.put("/groupremove",verifyUser, removeFromGroup);

module.exports = router;
