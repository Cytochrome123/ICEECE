const passport = require('passport')
const bcrypt = require("bcrypt")
const { model } = require('mongoose')
const User = model('User')
const Registration = require("../model/registration")
const ResetToken = require("../model/resetToken")
const crypto = require("crypto")
const mailer = require("../config/mail")
const qrcode = require("qrcode")

// exports.getSignUp = (req,res)=>{
//     res.render('user/signUp') 
// }
// exports.handleSignUp = async(req,res)=>{
//     const {fName,lName,email,Username,Password} = req.body
//     try {
//         let salt = await bcrypt.genSalt()
//         let password = await bcrypt.hash(Password,salt)
//         const user = await new User({
//             fName: fName,
//             lName: lName,
//             email: email,
//             Username:Username,
//             Password: password
//         }).save()

//         console.log(user);
//         res.redirect("/dashboard")
//         // passport.authenticate('local')(req,res, ()=>{
//         //     res.redirect('/dashboard')
//         // })
//     } catch (error) {
//         console.log(error);
//     }
// }
// exports.handleSignUp = async(req,res)=>{
//     const {fName,lName,email,Username,Password} = req.body
//     try {
//         let salt = await bcrypt.genSalt()
//         let password = await bcrypt.hash(Password,salt)
//         // const user = await new User({
//         //         fName: fName,
//         //         lName: lName,
//         //         email: email,
//         //         Username:Username,
//         //         Password: password
//         //     }).save()
  
//         // console.log(user);
//         await qrcode.toDataURL(email + password)
//         .then(src=>{
//             const user = new User({
//                 fName: fName,
//                 lName: lName,
//                 email: email,
//                 Username:Username,
//                 Password: password,
//                 qrcode: src
//             }).save()
  
//             console.log(user)
            
//         })
//         .catch(e=> console.log(e))
  
//         passport.authenticate('local')(req,res, ()=>{
//             res.redirect('/submitPaper')
//         })
  
//         // qrcode.toDataURL(email , (err,src)=>{
//         //     if(err){
//         //         return console.log(err)
//         //     }
//         //     passport.authenticate('local')(req,res, ()=>{
//         //         res.render('/profile' , {src})
//         //     })
//         // })
  
//         // await qrcode.toDataURL(email + password)
//         // .then(src=>{
//             // passport.authenticate('local')(req,res, ()=>{
//                 // res.render('profile' , {Username,src})
//             // })
//         // })
//         // .catch(e=> console.log(e))
  
        
//     } catch (error) {
//         console.log(error);
//     }
//   }
exports.getRegister = async(req,res)=>{
    res.render('register')
     
}
exports.handleRegister = async(req,res)=>{
    const {fName,lName,email,Password,country,institution,department,category}= req.body
    
    try{
        // let Password = crypto.randomBytes(8).toString("hex")
        let salt = await bcrypt.genSalt()
        let password = await bcrypt.hash(Password,salt)

        const Username = fName
        const code = await qrcode.toDataURL(email)
        
        const user = await new User({
            fName: fName,
            lName: lName,
            email: email,
            Username: Username,
            Password: password,
            phoneNumber:Password ,
            country: country,
            institution: institution,
            department: department,
            category : category,
            qrcode : code
        }).save()
        passport.authenticate('local')(req,res, ()=>{
            res.redirect('/dashboard')
        })
        
        console.log(user)
        console.log(code)
        
    }catch(e){
        console.log(e)
    }

    // await qrcode.toDataURL(email)
    // .then(code=>{
        
        
    // })
    // .catch(e=>console.log(e))
}
exports.getCreation = async(req,res)=>{
    res.render("admin/create")
}
exports.handleCreation = async(req,res)=>{
    const {email,Username,role}= req.body
    try {
        // let salt = await bcrypt.genSalt()
        // let password = await bcrypt.hash(Password,salt)
        const password = crypto.randomBytes("8").toString("hex")
        const reviewer = await new Registration({
            
            email: email,
            Username:Username,
            Password: password,
            role : role
        }).save()
        // const auto 
        console.log(reviewer);

        res.redirect('/admin/papers')

        // passport.authenticate('local')(req,res, ()=>{
        //     res.redirect('/admin/papers')
        // })
    } catch (error) {
        console.log(error);
    } 
}

exports.getVerifiedEmail = async(req,res)=>{
    const {Username,isVerified} = req.user
    if(isVerified){
        res.redirect("/profile")
    }else{
        const token = crypto.randomBytes(32).toString("hex")
        // console.log(token)
        await new ResetToken({
            token: token,
            email : req.user.email
        }).save()
        mailer.sendVerifyEmail(req.user.email, token);
        res.render("profile" , {Username , isVerified, emailSent:true})
    }
}
exports.getVerify = async(req,res)=>{
    const token = req.query.token

    if(token){
        const check = await ResetToken.findOne({token:token})

        if(check){
            const userData = await User.findOneAndUpdate({email: check.email , isVerified: true});
            // userData.isVerified = true
            await userData.save();

            await ResetToken.findOneAndDelete({token:token})

            res.redirect("/profile")
        }else{
            res.render("profile" , {Username , isVerified, err:"Invalid token or the token might have expired!!"})
        }

    }else{
        res.redirect("/profile")
    }
}

exports.handleAssign = async(req,res)=>{
    const {id }= req.params.id
    const {role} = req.body
    const user = await (await User.findByIdAndUpdate(id,{ $set: { role: role }}, {new:true})).save()
    .then((us => {
        console.log(us)
        res.redirect("/admin/attendance")
    }))
    .catch(e => console.log(e))
}
exports.getLogin = (req,res)=>{
    // console.log(req)
res.render('user/login')
}
exports.handleLogin = async(req,res, next)=>{
    const email = req.body.email
    // console.log(req.body)
    await Registration.findOne(email)
    .then(doc=>{
        if(doc.role == "Reviewer" || doc.role == "Admin"){
            passport.authenticate("local", {
                successRedirect: "/admin/paper",
                failureRedirect: "back",
                failureFlash: true,
                successFlash: true,
            })(req, res, next);
        }else{
            passport.authenticate("local", {
                successRedirect: "/dashboard",
                failureRedirect: "back",
                failureFlash: true,
                successFlash: true,
            })(req, res, next);
        }
    })
    .catch(e=>{
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "back",
            failureFlash: true,
            successFlash: true,
        })(req, res, next);
    })
    

}
exports.getProfile = async(req,res)=>{
    const {email,Username,isVerified} = req.user 
    await User.findOne({email:req.user.email})
    .then(doc=>{
        res.render("profile" , {doc , isVerified})
    })
//     await User.findOne({email:req.user.email})
//     .then(doc=>{
//         res.render("profile" , {doc})
//         })
}
exports.handlePublicProfile = async(req,res)=>{
    const {fName,lName,email,Password,country,institution,department,category}= req.body
    await User.findOne({email:email})
    .then(doc=>{
        // doc.publicProfile.push(req.body)
        // res.redirect("/profile")
    })
}






exports.getRegDash = (req,res)=>{
    res.render('user/registeredDashboard')
}


exports.getUserDash = (req,res)=>{
    res.render('user/userDashboard')
}
