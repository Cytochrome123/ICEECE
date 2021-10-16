const multer = require("multer");
const path = require("path")

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
        // console.log(file)
        const {originalname} = file
        cb(null, originalname)
    }
})


const upload = multer({storage})

// const {storage,upload} = module.exports

module.exports = {storage,upload}

// module.exports = {
//     storage : multer.diskStorage({
//         destination:(req,file,cb)=>{
//             // console.log(file)
//             cb(null, "public/uploads/papers")
//         },
//         filename:(req,file,cb)=>{
//             // console.log(file)
//             const {originalname} = file
//             cb(null, originalname)
//         }
//     }),    
//     upload : multer({storage})    
// }

// {
//     fieldname: 'file',
//     originalname: 'Developer.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg'
//   }

// module.exports = multer({
//     storage: multer.diskStorage({}),
//     fileFilter (req, file, cb) {

//         // The function should call `cb` with a boolean
//         // to indicate if the file should be accepted
//         if(!file.mimetype.match(/pdf || doc$i/)){
//             // To reject this file pass `false`, like so:
//             cb(new Error('I don\'t have a clue!'), false)
//             return
//         }
         
      
//         // To accept the file pass `true`, like so:
//         cb(null, true)
      
//         // You can always pass an error if something goes wrong:
//         // cb(new Error('I don\'t have a clue!'))
      
//       }
// })

// fileFilter = (req,file,cb)=>{
//     let ext = path.extname(file.originalname);
//     if(ext !== ".pdf" && ext !== ".doc"){
//         cb(
//             {
//               message: "Unsupported File Format",
//             },
//             false
//           );
//     }
//     cb(null, true)
// }