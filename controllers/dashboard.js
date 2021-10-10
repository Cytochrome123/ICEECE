const {cloudinary} = require("../config/cloudinary");

// const User = require("../model/user")
const Paper = require("../model/paper");
const Review = require("../model/review")


// ########USER#########

exports.getSubmitPaper = (req,res)=>{
    // console.log(req.User)
    res.render("user/paperSubmission" , {success : ""})
}
exports.handleSubmitPaper = async(req,res)=>{
    const {fName,lName,email,no,institution,department,position,title,author,passport,fileName,filePath} = req.body
    const x = "uploads/papers/"+req.file.originalname;
    const temp = new Paper({
         institution:institution,
         department:department,
         position:position,
         title:title,
         author:author,
         passport:passport,
         fileName:fName,
         // filePath: x
    }).save()
    .then(doc =>{
        res.render("user/paperSubmission" , {paper : doc , success : "Submitted successfully : Click to view"})
    })
    .catch(e => console.log(e)) 


    
    
}
exports.getPaperDetails = async(req,res)=>{
    const id = req.params.id
    const work = Paper.findById(id).populate("reviews").exec((err,doc)=>{
        if(err){
            console.log(err)
        }else{
            // Paper.populated("reviews")
            console.log(doc)
            // console.log(Paper.reviews.length
            res.render("user/paperDetails" , {doc})
        }
    })
    // .then(doc => {
    //     console.log(doc)
    //     res.render("user/paperDetails" , {doc})
    // })
    // .catch(e => console.log(e))
    
}

// ########REVIEWER########

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
    const paper = await Paper.findById(id)
    .then(doc =>{
        res.render("admin/viewPaper" , {paper:doc})
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


// ########ADMIN###########





exports.getRegister = (req,res)=>{
    res.render('register') 
}
exports.handleRegister = (req,res)=>{
    res.redirect('/regDash')
}
// exports.getAll = async(req,res)=>{
//     const fil = await cloudinary.api.resources("file");
//     console.log(fil)
//     res.send(fil)
// }



 


// exports.getProgress = async(req,res)=>{ 
//     const {id} = req.params
//     const about = await Paper.findById(id).populate("reviews")
//     .then(paper =>{
//         res.render("user/paperDetails", {paper:paper.reviews})
//     })
// }


exports.downloadPaper = async(req,res)=>{
    await Paper.findById({_id: req.params.id})
    .then(doc => {
        res.send(doc)
        // const y = __dirname+"/public/"+doc.filePath;
        // res.download(y)
    })
}
// C:\Users\Hp\Documents\iii\public\uploads\papers\GPLOADED ZLY 103  PAST QUESTIONS 2015.pdf


