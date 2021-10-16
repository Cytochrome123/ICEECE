// const {cloudinary} = require("../config/cloudinary");
const multer = require("multer")
const {storage,upload} = require("../config/multer")
const path = require("path")

// const User = require("../model/user")
const Paper = require("../model/paper");
const Review = require("../model/review")


// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         // console.log(file)
//         cb(null, "public/uploads/papers")
//     },
//     filename:(req,file,cb)=>{
//         // console.log(file)
//         const {originalname} = file
//         cb(null, originalname)
//     }
// })


// const upload = multer({storage})

// ########USER#########

exports.getSubmitPaper = (req,res)=>{
    // console.log(req.user)
    res.render("user/paperSubmission" , {success : ""})
}
exports.handleSubmitPaper = async(req,res)=>{
    console.log(req.file)
    const {fName,lName,email,no,institution,department,position,title,author,passport,fileName,filePath} = req.body
    const x = req.file.path;
    const temp = new Paper({
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


// ########ADMIN###########

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



exports.getRegister = (req,res)=>{
    res.render('register') 
}
exports.handleRegister = (req,res)=>{
    res.redirect('/regDash')
}




exports.downloadFile = async(req,res)=>{
    const {id} = req.params
    
    await Paper.findById(id)
    .then(doc=>{
        // const x =  __dirname +"\\" + doc.filePath
        const x =  __dirname + "/public/uploads/papers/Developer.jpg"
        // const y = path.resol
        res.download(x)
    })
}
