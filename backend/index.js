const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const adminRouter = require("./routes/adminRouter");
const postRouter = require("./routes/postRouter");
const uploadRouter = require("./routes/uploadRouter");
const app = express();
// const { readdirSync } = require("fs");

//middlewares
app.use(express.json()); // middleware to print json data
app.use(helmet());
app.use(morgan("common"));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//routing middleware 
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/post", postRouter);
app.use("/api/upload", uploadRouter);


//backend port
app.listen(8800, () => {
  console.log("Backend running...");
});
