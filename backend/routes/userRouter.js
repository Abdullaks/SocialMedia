const express = require("express");
const router = express.Router();
const {verifyUser}= require('../middleware/authMiddleware');
// const {
//   updateUser,
//   deleteUser,
//   getUser,
//   followUser,
//   unfollowUser,
// } = require("../controllers/userController");
const {getProfile} =require("../controllers/userController")

router.get("/profile/:username",verifyUser, getProfile);



// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);
// router.get("/:id", getUser);
// router.put("/:id/follow", followUser);
// router.put("/:id/unfollow", unfollowUser);

module.exports = router;
