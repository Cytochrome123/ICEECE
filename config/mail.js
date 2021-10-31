const nodemailer  = require("nodemailer")

const transport = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user: "hoismail2017@gmail.com",
        pass: "olaitan1570"
    },
    tls : {
        rejectUnauthorized : false 
    }
});

module.exports.sendRequestEmail = async(email , token)=>{
    const url = "http://localhost:3000"
}

module.exports.sendVerifyEmail = async(email,token)=>{
    const url = "http://localhost:3000/user/verifyEmail?token=" + token;

    console.log(url)

    await transport.sendMail({
        from : " 'ICEECE' <hoismail2017@gmail.com>",
        to : "hoismail1430@gmail.com",
        subject : "Verify your account",
        text : `Click this link to verify : ${url}`,
        html: `<h3>Click this link to verify : ${url}</h3>`
    })
    .then(()=>{
        console.log("Sent")
    })
    .catch(e=> console.log(e))
}