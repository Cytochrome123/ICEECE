require("dotenv").config()
const express = require("express")
const path = require("path")
const methodOverride = require("method-override");
const mongoose = require("mongoose")
const Paper = require("./model/paper")
const Review = require("./model/review")
const paper = require("./model/paper")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const passport = require("passport");
const User = require("./model/user")
const Contact = require("./model/contact")
const flash = require("connect-flash")
const http = require('http')
const fs = require("fs")
const { serializeDeserialize, passportLocalStrategy } = require("./config/passport")
const Session = require("./model/session")

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

// mongoose.connect("mongodb://localhost:27017/ICEECE",{useUnifiedTopology: true, useNewUrlParser:true});
 
mongoose.connect(process.env.MONGOURI,{useUnifiedTopology: true, useNewUrlParser:true});

mongoose.connection.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once("open", ()=>console.log("Database connected!!!"));


//db

// let db 
// if (process.env.NODE_ENV == "development") {
//   db = require("./config/config").mongoURI;
// } else {
//   db = process.env.mongoURI;
// }


// mongoose
//   .connect(db, {  
//      useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false})
//   .then(process.env.NODE_ENV == "development" ? () => console.log("Database connected") : "")
//   .catch((error)=>{
//      new Error(error.message, error.status)
//   })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(morgan("common"));
// app.use('/public', express.static('public'));

// var pathh = path.resolve(__dirname, 'public');
app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(methodOverride("_method"));
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


// app.get("/download/:id" , async(req,res)=>{
//   console.log(__dirname)

//   const { id } = req.params;

//     await Session.findById(id).then((doc) => {
//         try {
//             console.log(doc)
//             console.log(__dirname)
//             const x = __dirname +"\\" + doc.cameraReady[0].filePath
//             // const x =  __dirname + "/public/uploads/papers/Developer.jpg"
//             console.log("******xxxx*****")
//             console.log(x)
//             const y = __dirname + "/" + doc.cameraReady[0].fileDestination
//             console.log("******yyyy*****")
//             console.log(y)
//             res.download(x);
//             // res.download(y)
//         } catch (error) {
//             res.send(error)
//         }
//     });
// })


app.use(require('./routes/user'))
app.use(require('./routes/dashboard'))
app.use(require("./download"))

module.exports.isLoggedIn = (req ,res ,next)=>{
  if(req.isAuthenticated()){
    return next();

  }
  res.redirect("/login")
}



app.listen(process.env.PORT || 3000, ()=>console.log("hey"))