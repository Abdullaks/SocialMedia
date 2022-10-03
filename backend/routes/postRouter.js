const express = require("express");
const router = express.Router();
const {verifyUser}= require('../middleware/authMiddleware');
const {createPost,getAllPosts,comment,like,savePost,deletePost} = require("../controllers/postController");


router.post("/createPost",verifyUser,createPost );
router.get("/getAllPosts",verifyUser, getAllPosts);
router.post("/comment",verifyUser, comment);
router.post("/like",verifyUser, like);
router.put("/savePost/:id", verifyUser, savePost);
router.delete("/deletePost/:id", verifyUser, deletePost);


module.exports = router;
                          

