// const jwt = require("jsonwebtoken");
// const Admin = require("../models/adminModel");





// const verifyAdmin = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       //Get token from header
//       token = req.headers.authorization.split(" ")[1];

//       //Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get admin from token
//       req.admin = await Admin.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(401);
//       throw new Error("Not Authorized");
//     }
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error("Not Authorized,No token");
//   }
// };

// module.exports = { verifyAdmin };
