const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const { text } = require("express");

// CREATE POST
const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//ALL POST 
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE comment
const comment = async (req, res) => {
  try {
    const {postId,userId,text}= req.body
    const comment = await new Comment({
      Post:postId,
      commentBy:userId,
      commentText:text,
    }).save();
    res.json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




module.exports = {
  createPost,
  getAllPosts,
  comment,
};
