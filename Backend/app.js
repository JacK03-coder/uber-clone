const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser");
const connectDB = require('./database/db');
const userRoutes = require('./routes/user.routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();
app.use(cors());


app.get('/' , (req , res)=>{
    res.send("hello from app.js");
});
app.use('/users' , userRoutes);


module.exports = app;
