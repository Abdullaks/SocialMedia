const express = require("express");
const router = express.Router();
const {verifyUser}= require('../middleware/authMiddleware');
const {createPost,getAllPosts,comment,like} = require("../controllers/postController");


router.post("/createPost",verifyUser,createPost );
router.get("/getAllPosts",verifyUser, getAllPosts);
router.post("/comment",verifyUser, comment);
router.post("/like",verifyUser, like);

module.exports = router;
                          