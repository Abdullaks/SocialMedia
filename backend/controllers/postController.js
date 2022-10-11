const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const React = require("../models/reactModel");

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
      .populate("user", "username profilePicture ")
      .populate("Comments")
      .populate({
        path: "Comments",
        populate: {
          path: "commentBy",
          select: "username profilePicture",
        },
      })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//single  POST
const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById({ _id: id });
    res.json(post.text);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE comment
const comment = async (req, res) => {
  try {
    console.log("comment controller");
    console.log(req.body);
    const { postId, userId, text } = req.body;
    const comment = await new Comment({
      Post: postId,
      commentBy: userId,
      commentText: text,
    }).save();
    res.json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE react
const reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const check = await React.findOne({
      postRef: postId,
      reactBy: mongoose.Types.ObjectId(req.user.id),
    });
    if (check == null) {
      const newReact = new React({
        react: react,
        postRef: postId,
        reactBy: req.user.id,
      });
      await newReact.save();
    } else {
      if (check.react == react) {
        await React.findByIdAndRemove(check._id);
      } else {
        await React.findByIdAndUpdate(check._id, {
          react: react,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//save post
const savePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const user = await User.findById(req.user.id);
    const check = user?.savedPosts.find(
      (post) => post.post.toString() == postId
    );
    if (check) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          savedPosts: {
            _id: check._id,
          },
        },
      });
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          savedPosts: {
            post: postId,
            savedAt: new Date(),
          },
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//edit post
const editPost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate({ _id: req.params.id }, { $set: {
      text: req.body.text
    } });
    res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  comment,
  reactPost,
  deletePost,
  savePost,
  getSinglePost,
  editPost,
};
