const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')


//GET ALL USERS 
const getAllUsers = async (req, res) => {
    const users = await User.find({})
    console.log(users.length);
    res.json(users)  
};

const deleteUser = async (req, res) => {
    const { id } = req.params
    console.log(id,"delete backend");
    const userDelete = await User.findByIdAndDelete(id)
    console.log("deleted");
    res.json({ id })
}



module.exports={
    getAllUsers,
    deleteUser
}