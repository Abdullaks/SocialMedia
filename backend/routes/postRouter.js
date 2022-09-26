const express = require("express");
const router = express.Router();
const {verifyUser}= require('../middleware/authMiddleware');
const {createPost,getAllPosts,comment} = require("../controllers/postController");


router.post("/createPost",verifyUser,createPost );
router.get("/getAllPosts",verifyUser, getAllPosts);
router.post("/comment", comment);

module.exports = router;
                          