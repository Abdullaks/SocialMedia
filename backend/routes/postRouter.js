const express = require("express");
const router = express.Router();
const {verifyUser}= require('../middleware/authMiddleware');
const {createPost} = require("../controllers/postController");


router.post("/createPost",createPost );

 
module.exports = router;
                          