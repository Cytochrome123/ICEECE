const {cloudinary} = require("../config/cloudinary");

const Paper = require("../model/paper");


exports.getRegister = (req,res)=>{
    res.render('register') 
}
exports.handleRegister = (req,res)=>{
    res.redirect('/regDash')
}
exports.getAll = async(req,res)=>{
    const fil = await cloudinary.api.resources("file");
    console.log(fil)
    res.send(fil)
}
exports.getSubmitPaper = (req,res)=>{
    res.render("user/paperSubmission")
}
exports.handleSubmitPaper = async(req,res)=>{
       const {fName,lName,email,no,institution,department,position,title,passport,fileName,filePath} = req.body

       const x = "uploads/papers/"+req.file.originalname;
       const temp = new Paper({
            institution:institution,
            department:department,
            position:position,
            title:title,
            passport:passport,
            fileName:fName,
            filePath: x
       }).save()
       .then(doc =>{
           res.redirect("/submitPaper")
       })
       .catch(e => console.log(e))


    // console.log(req.file)
    // const result = await cloudinary.uploader.upload(req.file.path);
    // console.log("*****above****")
    // console.log(result)

    // try {
    //   const {path} = req.file;
    //   const pName = req.file.originalname.split(".")[0]
    // let result = await cloudinary.uploader.upload(
    //   path,
    //   {
    //     resource_type : "raw",
    //     public_id:`paperUploads/${pName}`
    //   },
    //   )
    //   res.json(result)
    // } catch (error) {
    //   res.json(error)
    // }

    // const paper = await  new Paper({
    //     institution:institution,
    //     department:department,
    //     position:position,
    //     title:title,
    //     passport:passport,
    //     fileName:result.original_filename,
    //     file:result.secure_url
    //     //  save files later
    // })
    // await paper.save()
    // .then(doc => {
    //     console.log("********doc")
    //     console.log(doc)  
    //     res.redirect("/userDash")
    // })
    // .catch(e => console.log(e))

    // console.log(req.file)
    // try{
    //     const result = await cloudinary.uploader.upload(req.file.path)
    //     console.log(result)
    // }catch(err){
    //     console.log(err)
    // }

    // try {
    //     const result = await cloudinary.uploader.upload(req.file.path)
    //     await console.log(result)
    //     res.send("success")
    // } catch (err) {
    //     console.log(err);
    // }
}
exports.getAllPapers = async(req,res)=>{
    const paper = await Paper.find()
    .then(doc => {
        console.log(doc)
        res.render("admin/submissions", {Paper:doc})
    })
    .catch(e => console.log(e))
    
}



exports.getProgress = (req,res)=>{
    res.render("user/progress")
}
exports.downloadPaper = async(req,res)=>{
    await Paper.find({_id: req.params.id}) 
    .then(doc => {
        const y = __dirname+"/public/"+doc[2].filePath;
        res.download(y)
    })
}
exports.reviewPaper = (req,res)=>{
    res.render("admin/review")
}
exports.handleReviewPaper = (req,res)=>{
    const {articleName}= req.body
    console.log(articleName)
}