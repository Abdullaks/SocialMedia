const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middleware/authMiddleware");
const imageUpload = require("../middleware/imageUpload");
const { uploadImages, getImages } = require("../controllers/uploadController");
// const { profilePhotoResize } = require("../middleware/photoresize");


router.post("/uploadImages", verifyUser, imageUpload, uploadImages);
router.get("/getImages", getImages);

module.exports = router;
