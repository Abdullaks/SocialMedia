const Post = require("../models/postModel");

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






module.exports = {
  createPost,
  getAllPosts,
};
