const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//UPDATE USER
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    //update password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    }
    try {
      // updating uesr
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("user updated");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("Only update ur account");
  }
};
//DELETE USER
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      //deleting user
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user Dleleted");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("Only update ur account");
  }
};

//GET USER
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//FOLLOW A USER
const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("already following this user");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

//UNFOLLOW A USER
const unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
};
