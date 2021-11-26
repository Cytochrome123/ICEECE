const nodemailer  = require("nodemailer")
// const mailGun = require("nodemailer-mailgun-transport")
const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.envs.MAIL)

// const message = {
//     from: "hoismail2017@gmail.com",
//     to: "hoismail1435@gmail.com",
//     subject: "Demo",
//     text: "Hello from ICEECE"
// };

// sgMail.send(message)
// .then(response=> console.log("Email Sent"))
// .catch(e=>console.log(e.message))

// *****mailGun******
// const auth = {
//     // auth: {
//     //     api_key: "",
//     //     domain: ""
//     // }
// }

// const transporter = nodemailer.createTransport(mailGun(auth))

// const mailOptions = {
//     from: "hoismail2017@gmail.com",
//     to: "hoismail1430@gmail.com",
//     subject: "Demo",
//     text: "Hello from ICEECE"
// };

// transporter.sendMail(mailOptions, (err,data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })

//***********Nm********** */

// const transport = nodemailer.createTransport({
//     // service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth:{
//         user: "hoismail2017@gmail.com",
//         pass: 
//     },
//     tls : {
//         rejectUnauthorized : false 
//     }
// });

// module.exports.sendRequestEmail = async(email , token)=>{
//     const url = "http://localhost:3000"
// }

// module.exports.sendVerifyEmail = async(email,token)=>{
//     const url = "http://localhost:3000/user/verifyEmail?token=" + token;

//     console.log(url)

//     await transport.sendMail({
//         from : " 'ICEECE' <hoismail2017@gmail.com>",
//         to : "hoismail1430@gmail.com",
//         subject : "Verify your account",
//         text : `Click this link to verify : ${url}`,
//         html: `<h3>Click this link to verify : ${url}</h3>`
//     })
//     .then(()=>{
//         console.log("Sent")
//     })
//     .catch(e=> console.log(e))
// }