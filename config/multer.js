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


module.exports = multer({
    storage : multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null, "./public/uploads/papers")
        },
        filename:(req,file,cb)=>{
            cb(null, file.originalname)
        }
    })
})

const upload = multer({storage:multer})

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