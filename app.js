require("dotenv").config()
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const Paper = require("./model/paper")
const Review = require("./model/review")
const paper = require("./model/paper")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const passport = require("passport");
const User = require("./model/User")

const flash = require("connect-flash")
const http = require('http')
const fs = require("fs")
const { serializeDeserialize, passportLocalStrategy } = require("./config/passport")

// const AWS = require("aws-sdk")


// const s3 = new AWS.S3({
//     accessKeyId:process.env.AWS_ID,
//     secretAccessKey:process.env.AWS_SECRET
// })

const app = express()

const sessionConfig = {
    secret: "thisisasecret",
    saveUninitialized : false,
    resave : false,
    cookie : {
        httpOnly : true,
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7
    }
  
  };

mongoose.connect("mongodb://localhost:27017/ICEECE",{useUnifiedTopology: true, useNewUrlParser:true});
 
// mongoose.connect("mongodb+srv://ICEECE:iceece@papers.r8aup.mongodb.net/conference?retryWrites=true&w=majority",{useUnifiedTopology: true, useNewUrlParser:true});

mongoose.connection.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once("open", ()=>console.log("Database connected!!!"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(morgan("common"));
app.use('/public', express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

serializeDeserialize(passport)
passportLocalStrategy(passport)


 
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.User = req.user;
    res.locals.path = req.path;
    next();
  });




app.use(require('./routes/user'))
app.use(require('./routes/dashboard'))


module.exports.isLoggedIn = (req ,res ,next)=>{
  if(req.isAuthenticated()){
      return next();

  }
  res.redirect("/login")
}

// ***ADMIN*****

// app.get("/admin/attendance", async(req,res)=>{
//   try {
//     const users = await  User.find()

//     res.render("admin/attendance", {users})
//   } catch (error) {
//     console.log(error);
//       // new Error(error)
//   }
// })




app.listen(process.env.PORT || 3000, (req,res)=>console.log("hey"))