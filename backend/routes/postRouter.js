const express = require("express");
const router = express.Router();
const {verifyUser}= require('../middleware/authMiddleware');
const {createPost,getAllPosts} = require("../controllers/postController");


router.post("/createPost",verifyUser,createPost );
router.get("/getAllPosts",verifyUser, getAllPosts);


 
module.exports = router;
                          