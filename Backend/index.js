const mongoose = require('mongoose');
require('dotenv').config()
//const config =require('config')
const morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
const express = require('express')
const app = express()

//MY ROUTES
const authRoutes = require('./routes/auth')
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category");
const adRoutes = require("./routes/ad");
const reviewadRoutes = require("./routes/reviewads")
//CONNECTING TO THE DB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true}).then(()=>{
    console.log("DB CONNECTED");
  });

  
  if (process.env.NODE_ENV !== "test") {
    //use morgan to log at command line
    app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
  }

//MIDDLEWARE
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(cors());
  //myroutes
  app.use('/api',authRoutes);
  app.use('/api',userRoutes);
  app.use('/api',categoryRoutes);
  app.use('/api',adRoutes);
  app.use('/api',reviewadRoutes)
  

//PORT
const port = process.env.PORT || 8000;



//SERVER
app.listen(port, () => {
  console.log(` listening at http://localhost:${port}`)
})
module.exports=app;