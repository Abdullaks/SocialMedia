const express = require("express");
const router = express.Router();
const {verifyUser}= require('../middleware/authMiddleware');
const imageUpload = require('../middleware/imageUpload');
const {uploadImages} = require("../controllers/uploadController");


router.post("/uploadImages",verifyUser,imageUpload,uploadImages );

 
module.exports = router;
                          