const express = require("express");
const router = express.Router();
const {verifyUser}= require('../middleware/authMiddleware');

const {
  getProfile,
  updateProfilePicture,
  updateCoverPicture,
  updateBio,
  follow,
  unFollow,
  search,
  allUsers,
} = require("../controllers/userController");

router.get("/getProfile/:username",verifyUser, getProfile);
router.put("/updateProfilePicture",verifyUser, updateProfilePicture);
router.put("/updateCoverPicture",verifyUser, updateCoverPicture);
router.put("/updateBio",verifyUser, updateBio);
router.put("/follow/:id",verifyUser, follow);
router.put("/unfollow/:id",verifyUser, unFollow);
router.post("/search/:searchTerm", verifyUser, search);
router.get("/", allUsers);



module.exports = router;
