// const {cloudinary} = require("../config/cloudinary");
const multer = require("multer")
const {storage,upload} = require("../config/multer")
const path = require("path")
const mongoose = require("mongoose")

const User = mongoose.model('User')
const Paper = require("../model/paper");
const Review = require("../model/review")
const Correction = require("../model/correction")
const Update = require("../model/update")
const Payment = require("../model/payment")
const Session = require("../model/session")
const Attendance = require("../model/attendance")
// const QRScanner = require("qr-code-scanner")

exports.getHome = (req,res)=>{
    res.send("WELCOME TO ICEECE")
}
exports.getDashboard = async(req,res)=>{
    console.log(req.user)
    const session = await Session.find()
    .then(session=>{
        res.render("dashboard" , {session})
    })
    
}


// ########USER#########
exports.getPaymentConfirmation = (req,res)=>{
    res.render("user/confirmation")
}
exports.handlePaymentConfirmation = (req,res)=>{
    // const user = req.user
    const {mode,amount,proof} = req.body
    const payment = new Payment({
        fName: req.user.fName,
        email : req.user.email,
        mode: mode,
        amount: amount,
        // proof : proof.
    }).save()
    .then(payment=>{
        res.redirect("/dashboard")
    })
    
}
exports.getMarkAttendance = async(req,res)=>{
    const date = new Date().toDateString()
    const sessions = await Session.find({starts: {$gte : date}})
    .then(sessions=>{
        console.log(sessions)

        // QRScanner.initiate({
        //     // match: /^[a-zA-Z0-9]{16,18}$/, // optional
        //     onResult: (result)=> { console.info('DONE: ', result); },
        //     onError: function (err) { console.error('ERR :::: ', err); }, // optional
        //     onTimeout: function () { console.warn('TIMEOUT'); } // optional
        // })

        res.render("user/mark-attendance" , {sessions})
    })
}
exports.handleMarkAttendance = async(req,res)=>{
    const {session,email,role} =  req.body
    const attendance = await new Attendance().save()
    .then(attendance=>{
        res.redirect("/mark-attendance")
    })
    .catch(e=>console.log(e))
}
exports.getSubmitPaper = (req,res)=>{
    // console.log(req.user)
    res.render("user/paperSubmission" , {success : ""})
}
exports.handleSubmitPaper = async(req,res)=>{
    console.log(req.file)
    console.log(req.user)
    const {fName,lName,email,no,institution,department,position,title,author,passport,fileName,filePath} = req.body
    const x = req.file.path;
    const temp = new Paper({
        // fName: req.user.fName,
        // lName: req.user.lName,
        institution:institution,
        department:department,
        position:position,
        title:title,
        author:author,
        passport:passport,
        fileName:req.file.originalname,
        filePath: x
    }).save()
    .then(doc =>{
        res.render("user/paperSubmission" , {paper : doc , success : "Submitted successfully : Click to view"})
    })
    .catch(e => res.send("You need to login before submitting "))

}
exports.getPaperDetails = async(req,res)=>{
    const id = req.params.id
    const work = Paper.findById(id).populate("reviews").populate("updates").populate("corrections").exec((err,doc)=>{
        if(err){
            console.log(err)
        }else{
            // Paper.populated("reviews")
            console.log(doc)
            // console.log(Paper.reviews.length
            res.render("user/paperDetails" , {doc})
        }
    })
    
}
exports.handlePaperUpdate = async(req,res)=>{
    const {id} = req.params

    await Paper.findById(id)
    .then(paper=>{
        new Update({
            title:"String",
            author: "String",
            fileName: "String",
            filePath:"String"
        }).save()
        .then(update=>{
            paper.updates.push(update)
            paper.save()
            .then(doc=>{
                res.redirect("/user/paperDetails/<%=doc._id%>")
            })
            .catch(e=> res.send("The updated file is missing!!!"))
        })
        .catch(e=> res.send("Failed t upload update!!!"))
    })

}

// ########REVIEWER########

exports.getAll = async(req,res)=>{
    await Paper.find()
    .then(doc=>{
        res.render("all" , {doc})
    })
}

exports.getAllPapers = async(req,res)=>{
    const paper = await Paper.find()
    .then(doc => {
        console.log(doc)
        res.render("admin/allSubmissions", {Paper:doc})
    })
    .catch(e => console.log(e))
    
}
exports.getDetails = async(req,res)=>{
    const {id} = req.params
    const paper = await Paper.findById(id).populate("reviews").populate("updates").populate("corrections").exec()
    .then(doc =>{
        res.render("admin/viewPaper" , {paper:doc})
    })
    .catch(e=>res.send(e) )
    
}
exports.handlePaperCorrection = async(req,res)=>{
    const id = req.params.id

    await Paper.findById(id)
    .then(pape=>{
        new Correction({
            title:String,
            author: String,
            fileName: String,
            filePath:String,
        }).save()
        .then(correction=>{
            const paper = pape.corrections.push(correction)
            paper.save()
            .then(paper=>{
                res.redirect("/admin/viewPaper/<%=paper._id%>")
            })
        })
    })
    
}
exports.reviewPaper = async(req,res)=>{
    const {id} = req.params
    const paper = await Paper.findById(id)
    .then(doc=>{
        res.render("admin/review" , {doc})
    })
    
}
exports.handleReviewPaper = async(req,res)=>{
    // const {articleName,satisfy,aware,descriptive,reason_to_title,original,significance,clarity,procedure,beneficial,organization,complete,references,read,audience,comment_to_editor,comment_to_author,score,recommendation,re_review,date} = req.body
    // console.log(req.body)
    const {id} = req.params
    const paper = await Paper.findById(id)
    .then(doc =>{
        console.log(doc)
        const rew = new Review(req.body)
       .save() 
       .then(com => {
           doc.reviews.push(com)
           doc.save()
           .then(fullDoc =>{
               console.log(fullDoc)
               res.redirect("/admin/papers")
           })
           .catch(e=>{
               console.log(e)
           })
           
        })
    })
    
    
}
exports.getREreview = async(req,res)=>{
    const {id} = req.params
    const paper = await Paper.findById(id)
    .then(doc=>{
        res.render("admin/editReview" , {doc})
    })
}
exports.handleREreview = async(req,res)=>{
    const {id} = req.params
    const paper = await Paper.findOneAndUpdate({_id : id} , req.body )
    // console.dir(paper)
        // if(!err){
        //     console.log(doc)
        //    res.redirect("/admin/viewPaper/<%=doc._id%>") 
        // }else{
        //     res.send(err)
        // }
        
    // })
    // let fnc = () =>{
    //     let data = []
    // Object.entries(req.body).forEach(([el,val])=>{
    //     // console.log(el, ":",  val)
    //     data.push(el)
    // })
    // return data
    // }
    // console.log(fnc())

}

// #######SPEAKER#########
exports.getSpeakerForm = async(req,res)=>{
    const {id} = req.params
    const session = await Session.find({id})
    .then(session=>{
        res.render("speaker/addInfo" , {session})
    })
}
exports.handleSpeakerForm = async(req,res)=>{
    const {id} = req.params
    const {name,type,duration,starts,ends,access,roles,topic,pDetails} = req.body
    const session = await Session.findByIdAndUpdate({id:id} , {
        topic:topic,
        pDetails:pDetails
    }).save()
    .then(session=>{
        res.redirect("/dashboard")
    })
}

// ########ADMIN###########

exports.getSpeakers = async(req,res)=>{
    const speakers = await User.find({role: "Speaker"})
    .then(speakers=>{
        res.render("superAdmin/speakers" , {speakers})
    })
}

// exports.getManageSpeaker = async(req,res)=>{
//     const {id} = req.params
//     const speaker = await User.findById({_id: id})
//     .then(speaker=>{
//         res.render("speakers" , {speaker})
//     })
// }
exports.getPayments = async(req,res)=>{
    const payment = await Payment.find()
    .then(payment=>{
        res.render("admin/payments" , {payment})
    })
    .catch(e=>console.log(e))
    
}
exports.getAddSession = async(req,res)=>{
    const users = await User.find()
    .then(users=>{
        res.render("superAdmin/addSession", {users})
    })
    .catch(e=>console.log(e))
}
exports.handleAddSession = async(req,res)=>{
    const {name,type,duration,startDate,startTime,endDate,endTime,access,role,moderator,speakers} = req.body
    // const start = starts.toDateString()
    // console.log(start)
    const session = new Session(req.body).save()
    .then(session=>{
        res.redirect("/dashboard")
    })
    
}

exports.getAttendance = async(req,res)=>{
    const attendance = await Attendance.find()
    .then(attendance=>{
        res.render("superAdmin/attendance" , {attendance})
    })
}
exports.deletePaper = async(req,res)=>{
    const {id} = req.params
    try {
        await Paper.findByIdAndDelete(id)
        .then(doc=>{
            res.redirect("/admin/papers")
        })
        
    } catch (error) {
        res.send(error)
    }
    
    
}








exports.downloadFile = async(req,res)=>{
    const {id} = req.params
    
    await Paper.findById(id)
    .then(doc=>{
        // insert the path its gonna depend on cPanel
        const x =  __dirname +"\\Documents\\iii\\" + doc.filePath
        // const x =  __dirname + "/public/uploads/papers/Developer.jpg"
        // const y = path.resol
        // const x = process.env.HOME + "/Downloads/Edge_Downloads/ICEECE-master/public/uploads/papers/Developer.jpg"
        res.download(x)
    })
}