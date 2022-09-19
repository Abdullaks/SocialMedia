const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv= require('dotenv').config();
const connectDB=require('./config/db')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const adminRouter = require('./routes/adminRouter')
const app = express();

//middlewares 
app.use(express.json());     // middleware to print json data
app.use(helmet()); 
app.use(morgan("common"));


app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/admin',adminRouter);



app.listen(8800,()=>{
    console.log('backend running');      
});
