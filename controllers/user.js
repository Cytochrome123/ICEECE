const passport = require('passport')
const bcrypt = require("bcrypt")
const methodOverride = require("method-override");
const { model } = require('mongoose')
const User = model('User')
const Contact = require("../model/contact")
const ResetToken = require("../model/resetToken")
const crypto = require("crypto")
const mailer = require("../config/mail")
const qrcode = require("qrcode")
const contact = require('../model/contact')
const sgMail = require("@sendgrid/mail")
const mail = require("../config/mail")
const path = require("path");
const ejs = require("ejs");
const reg = require("../utils/wordreg");
const Contact = require('../model/contact');



const seed = async () => {
    try{
    for (let i = 0; i <= reg.length; i++) {
        let pass = crypto.randomBytes(3).toString("hex")
        let salt = await bcrypt.genSalt()
        let password = await bcrypt.hash(pass,salt)
        const role = "Participant"
        const code = await qrcode.toDataURL(`${reg[i].fName} ${reg[i].category} ${role}`)

        const user = new User({
            fName: `${reg[i].fName}`,
            lName: `${reg[i].lName}`,
            email: `${reg[i].email}`,
            Username: `${reg[i].Username}`,
            Password: password,
            phoneNumber : `${reg[i].phoneNumber}`,
            country: `${reg[i].country}`,
            institution: `${reg[i].institution}`,
            department: `${reg[i].department}`,
            category : `${reg[i].category}`,
            qrcode : code
        })
        await user.save();
        console.log(pass)

        const message = {
            from: " 'ICEECE & AMF 2021' <iceece.amf.eee.ui@gmail.com>",
            to: `${reg[i].email}`,
            subject: "Welcome to 1st ICEECE & AMF 2021 portal",
            text:`Your Username is ${reg[i].email} and Password is ${pass}`,
            
            html:`<div><p>Dear ${reg[i].fName},</p> <br><p>Thank you for registering to participate at the International Conference on Electrical Electronics and Communication Engineering and Allied Multidisciplinary Fields (ICEECE & AMF 2021) organized by the Department of Electrical Electronics Engineering, University of Ibadan.</p><p>You can access information about various sessions at the conference as well as your payment status through the Web App.</p><br><p>Your login credentials are:</p><br><p>Username: ${reg[i].email}</p> <p>Password: ${pass}</p><p>Click the link below to login to your Account and access the WebApp.</p><br><a href="http://portal.eeeuicon2021.org" >Login</a><br><p>For further inquiries please contact- <a href="iceece.amf@ui.edu.ng" >iceece.amf@ui.edu.ng</a></p><br></br><p>Best Regards,</p><p>The ICEECE & AMF 2021 Team.</p></div>`
           

        };

        await sgMail.send(message)
        .then((response)=> {
            console.log("Email Sent")
        })
        .catch(e=>console.log(e.message))
    }
}catch(e){
    console.log(e)
}   
    
        
}
// seed()
exports.getRegister = async(req,res)=>{
    let pass = crypto.randomBytes(3).toString("hex")
    res.render('register', {pass})
     
}
exports.handleRegister = async(req,res)=>{
    const {fName,lName,email,Password,phoneNumber,country,institution,department,category}= req.body
    
    try{
        // let pass = crypto.randomBytes(8).toString("hex")
        let salt = await bcrypt.genSalt()
        let password = await bcrypt.hash(Password,salt)
        const role = "Participant"
        const Username = fName
        const code = await qrcode.toDataURL(`${fName} ${category} ${role}`)
        
        const user = await new User({
            fName: fName,
            lName: lName,
            email: email,
            Username: Username,
            Password: password,
            phoneNumber:phoneNumber ,
            country: country,
            institution: institution,
            department: department,
            category : category,
            qrcode : code
        }).save()
        console.log(Password)
        const message = {
            from: " 'ICEECE & AMF 2021' <iceece.amf.eee.ui@gmail.com>",
            to: email,
            subject: "Welcome to 1st ICEECE & AMF 2021 portal",
            text:`Your Username is ${email} and Password is ${Password}`,
            
            html:`<div><p>Dear ${fName},</p> <br><p>Thank you for registering to participate at the International Conference on Electrical Electronics and Communication Engineering and Allied Multidisciplinary Fields (ICEECE & AMF 2021) organized by the Department of Electrical Electronics Engineering, University of Ibadan.</p><p>You can access information about various sessions at the conference as well as your payment status through the Web App.</p><br><p>Your login credentials are:</p><br><p>Username: ${email}</p> <p>Password: ${Password}</p><p>Click the link below to login to your Account and access the WebApp.</p><br><a href="http://portal.eeeuicon2021.org" >Login</a><br><p>For further inquiries please contact- <a href="iceece.amf@ui.edu.ng" >iceece.amf@ui.edu.ng</a></p><br></br><p>Best Regards,</p><p>The ICEECE & AMF 2021 Team.</p></div>`
           

        };

        await sgMail.send(message)
        .then((response)=> {
            console.log("Email Sent")
        })
        .catch(e=>console.log(e.message))
        passport.authenticate('local')(req,res, ()=>{
            res.redirect('/dashboard')
        })
        
        console.log(user)

    }catch(e){
        console.log(e)
    }

    // await qrcode.toDataURL(email)
    // .then(code=>{
        
        
    // })
    // .catch(e=>console.log(e))
}
exports.getCreateRP = async(req,res)=>{
    res.render("superAdmin/create")
}
exports.handleCreateRP = async(req,res)=>{
    const {fName,lName,email,phoneNumber,institution,role}= req.body
    
        const pass = crypto.randomBytes(3).toString("hex")
        let salt = await bcrypt.genSalt()
        let password = await bcrypt.hash(pass,salt)
        const code = await qrcode.toDataURL(email + fName+" "+lName + role)
        const player = await new User({
            fName: fName,
            lName: lName,
            email: email,
            Username: fName,
            Password: password,
            phoneNumber: phoneNumber,
            institution: institution,
            qrcode : code,
            role: role,
            rp:"rp"
        }).save()
        // const auto 
        .then(async(player)=>{
            console.log(pass); 
            const invite = {
                from: " 'ICEECE & AMF 2021' <iceece.amf.eee.ui@gmail.com>",
                to: email,
                subject: "Welcome to 1st ICEECE & AMF 2021 portal",
                text:`Your Username is ${email} and Password is ${pass}`,
                html:`<div><p>Dear ${fName},</p> <br><p>You have been assigned to the role of a ${role} at ICEECE & AMF 2021 organized by the Department of Electrical Electronics Engineering, University of Ibadan.</p><br><p>Your login credentials are:</p><br><p>Username: ${email}</p> <p>Password: ${pass}</p><p>Click the link below to login to your Account and access the WebApp.</p><br><a href="http://portal.eeeuicon2021.org" >Login</a><br><p>For further inquiries please contact- <a href="iceece.amf@ui.edu.ng" >iceece.amf@ui.edu.ng</a></p><br></br><p>Best Regards,</p><p>The ICEECE & AMF 2021 Team.</p></div>`
            };
            
            await sgMail.send(invite)
            .then((response)=> {
                console.log("Email Sent")
                res.redirect('/admin/role-player')
            })
            .catch(e=>console.log(e.message))
        })
        .catch(e=>{
            console.log(e)
        })
        
        
       
}
exports.editRP = async(req,res)=>{
    const {id} = req.params;
    await User.findByIdAndUpdate(id, req.body, {new:true})     
    .then(rp => res.redirect("/admin/role-player"))
    .catch(err => console.log(err))
}
exports.deleteRP = async(req,res)=>{
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id)
        .then((user) => {
            res.redirect("/admin/role-player");
        })
        .catch((e) => res.send(e));
}
exports.getRP = async(req,res)=>{
    await User.find({rp:"rp"})
    .then(rp=>{
        res.render("superAdmin/role-player" , {rp})
    })
}
exports.getAll = async(req, res) => {
    await User.find().then((doc) => {
        res.render("superAdmin/participants", { doc });
    });
};
exports.getPresenters = async(req, res) => {
    const presenters = await User.find({ role: "Presenter" })
    .then(
        async(presenters) => {
            // Session.find
            res.render("superAdmin/presenters", { presenters });
        },
    );
};
exports.editPresenter = async(req,res)=>{
    const {id} = req.params;
    await User.findByIdAndUpdate(id, req.body, {new:true})     
    .then(rp => res.redirect("/admin/presenters"))
    .catch(err => console.log(err))
};
exports.deletePresenter = async(req,res)=>{
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id)
        .then((user) => {
            res.redirect("/admin/presenters");
        })
        .catch((e) => res.send(e));
}
exports.getSpeakers = async(req, res) => {
    const speakers = await User.find({ role: "Speaker" }).then((speakers) => {
        res.render("superAdmin/speakers", { speakers });
    });
};
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
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "back",
        failureFlash: true,
        successFlash: true,
    })(req, res, next);
    

}
exports.logout = (req,res)=>{
    req.logout();
    res.redirect("/login")
}
exports.getProfile = async(req,res)=>{
    const {email,Username,isVerified} = req.user 
    await User.findOne({email:req.user.email})
    .then(doc=>{
        Contact.findOne({email:req.user.email})
        .then(pic=>{
            res.render("user/profile" , {doc ,pic, isVerified, msg:""})
        })
        
    })
//     await User.findOne({email:req.user.email})
//     .then(doc=>{
//         res.render("profile" , {doc})
//         })
}
exports.handlePublicProfile = async(req,res)=>{
    const {fName,lName,email,phoneNumber,country,institution,department}= req.body
    const public = new Contact({
        fName: fName,
        lName: lName,
        email: email,
        phoneNumber:phoneNumber ,
        country: country,
        institution: institution,
        department: department,
        fileName:req.file.originalname,
        filePath: x
    }).save()
    .then(public=>{
        res.redirect("/profile" , {msg:"filled"})
    })
}






exports.getRegDash = (req,res)=>{
    res.render('user/registeredDashboard')
}


exports.getUserDash = (req,res)=>{
    res.render('user/userDashboard')
}
