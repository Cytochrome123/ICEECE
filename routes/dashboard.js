const router = require('express').Router();
const upload = require("../config/multer")
const dashboard  = require('../controllers/dashboard')
// const {isLoggedIn} = require("../app")


//###########USER####### 

router.route( '/submitPaper') 
.get(isLoggedIn , dashboard.getSubmitPaper)
.post(upload.single("file"),dashboard.handleSubmitPaper)

router.get("/user/paperDetails/:id" , dashboard.getPaperDetails)


 
// ######REVIEWER########### 


router.route("/admin/papers")
.get(dashboard.getAllPapers)

router.get('/admin/viewPaper/:id', dashboard.getDetails)

router.route("/admin/review/:id")
.get(dashboard.reviewPaper)
.post(dashboard.handleReviewPaper)


// ########ADMIN###########








// REGISTER ROUTES
router.route('/register')
.get(dashboard.getRegister)
.post(dashboard.handleRegister)

router.route("/download/:id")
.get(dashboard.downloadPaper)


function isLoggedIn(req ,res ,next){
    if(req.isAuthenticated()){
        return next();

    }
    res.redirect("/login")
}

module.exports =  router