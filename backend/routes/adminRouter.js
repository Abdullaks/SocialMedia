const express = require("express");
const router = express.Router();
const {verifyUser} =require("../middleware/authMiddleware")
const {getAllUsers ,deleteUser} = require("../controllers/adminController");

     

router.get("/", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);



module.exports = router;