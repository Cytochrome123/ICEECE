const localStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

const User = require('../model/user');


module.exports.serializeDeserialize = (passport) =>{
    passport.serializeUser((user, done) =>{
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
    });
}

module.exports.passportLocalStrategy = (passport) =>{
    passport.use(
        new localStrategy({ usernameField: "email", passwordField:"Password" }, (email, password, done) => {
          //Match User
          email = email.toLowerCase();
          User.findOne({ email: email })
            .then((user) => {
              if (!user) {
               
                return done(null, false, {
                  message: "That email is not registered",
                });
              }
              //Match password
              bcrypt.compare(password, user.Password, (err, isMatch) => {
                if (err) throw err;
    
                if (isMatch) {
                   
                  return done(null, user);
                } else {
                  
                  return done(null, false, { message: "Password Incorrect" });
                }
              });
            })
            .catch((err) => new Error(error));
        })
      );
}