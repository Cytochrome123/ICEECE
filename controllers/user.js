const passport = require('passport')
const bcrypt = require("bcrypt")
const { model } = require('mongoose')
const User = model('User')

exports.getSignUp = (req,res)=>{
    res.render('signUp') 
}
exports.handleSignUp = async(req,res)=>{
    const {fName,lName,email,Username,Password} = req.body
    try {
        let salt = await bcrypt.genSalt()
        let password = await bcrypt.hash(Password,salt)
        const user = await new User({
                fName: fName,
                lName: lName,
                email: email,
                Username:Username,
                Password: password
            }).save()

            console.log(user);

        passport.authenticate('local')(req,res, ()=>{
            res.redirect('/userDash')
        })
    } catch (error) {
        console.log(error);
    }
}  
exports.handleAssign = async(req,res)=>{
    const {id }= req.params.id
    const user = await (await User.findByIdAndUpdate(id,{ $set: { role: 'admin' }}, {new:true})).save()
    .then((us => {
        console.log(us)
        res.redirect("/admin/attendance")
    }))
    .catch(e => console.log(e))
}
exports.getLogin = (req,res)=>{
res.render('login')
}
exports.handleLogin = (req,res, next)=>{
    passport.authenticate("local", {
        successRedirect: "/userDash",
        failureRedirect: "back",
        failureFlash: true,
        successFlash: true,
      })(req, res, next);

}
exports.getRegDash = (req,res)=>{
    res.render('user/registeredDashboard')
}
exports.getUserDash = (req,res)=>{
    res.render('user/userDashboard')
}
