const router = require("express").Router();
// const upload = require("../config/multer")
const multer = require("multer");
const { storageCam, upload1 } = require("./config/multer");
const Session = require("./model/session");




router.get("/download/camera-ready/:id" , async(req,res)=>{
    console.log(__dirname)
  
    const { id } = req.params;
  
      await Session.findById(id).then((doc) => {
          try {
              for (let i = 0; i <= 5; i++){
                  console.log(doc)
                  console.log(__dirname)
                  let x =  doc.cameraReady[0].filePath
                  
                  res.download(x);
              }
              
              // res.download(y)
          } catch (error) {
              res.send(error)
          }
      });
  })

module.exports = router