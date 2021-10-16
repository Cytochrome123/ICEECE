const router = require('express').Router();
// const upload = require("../config/multer")
const multer = require("multer")
const {storage,upload} = require("../config/multer")

const dashboard  = require('../controllers/dashboard')
// const {isLoggedIn} = require("../app")





//###########USER####### 

router.route( '/submitPaper') 
.get( dashboard.getSubmitPaper)
.post(upload.single("file"),dashboard.handleSubmitPaper)

router.get("/user/paperDetails/:id" , dashboard.getPaperDetails)


 
// ######REVIEWER########### 
router.route("/all")
.get(dashboard.getAll)


router.route("/admin/papers")
.get(dashboard.getAllPapers)

router.get('/admin/viewPaper/:id', dashboard.getDetails)

router.get("/download/:id" , dashboard.downloadFile)

router.route("/admin/review/:id")
.get(dashboard.reviewPaper)
.post(dashboard.handleReviewPaper)

router.route("/admin/review/edit/:id")
.get(dashboard.getREreview)
.post(dashboard.handleREreview)


// ########ADMIN###########

router.route("/admin/delete/:id")
.get(dashboard.deletePaper) 





// REGISTER ROUTES
router.route('/register')
.get(dashboard.getRegister)
.post(dashboard.handleRegister)




function isLoggedIn(req ,res ,next){
    if(req.isAuthenticated()){
        return next();

    }
    res.redirect("/login")
}

module.exports =  router