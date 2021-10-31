const multer = require("multer");
const path = require("path")
const mongoose = require("mongoose")

const User = mongoose.model('User')

// module.exports = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req,file,cb)=>{
//         let ext = path.extname(file.originalname);
//         if(ext !== ".pdf" && ext !== ".doc"){
//             cb(new Error("file type is not supported"), false);
//             return;
//         }
//         cb(null, true)
//     } 
// })


// module.exports = multer({
//     storage : multer.diskStorage({
//         destination:(req,file,cb)=>{
//             // console.log(file)
//             cb(null, "./public/uploads/papers")
//         },
//         filename:(req,file,cb)=>{
//             // console.log(file)
//             cb(null, file.originalname)
//         }
//     })
// })

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        // console.log(file)
        cb(null, "public/uploads/papers")
    },
    filename:(req,file,cb)=>{
        // console.log(req.user)
        const {originalname} = file
        // const custom = `${req.user._id} -- originalname`
        cb(null, originalname)
    }
})


const upload = multer({storage})

// const {storage,upload} = module.exports

module.exports = {storage,upload}


