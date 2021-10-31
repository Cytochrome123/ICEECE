const router = require('express').Router();
// const upload = require("../config/multer")
const multer = require("multer")
const {storage,upload} = require("../config/multer")

const dashboard  = require('../controllers/dashboard')
// const {isLoggedIn} = require("../app")



router.get("/" , dashboard.getHome)
router.get("/dashboard" , dashboard.getDashboard)



//###########USER####### 

router.route("/user/payment-confirmation")
.get(dashboard.getPaymentConfirmation)
.post(dashboard.handlePaymentConfirmation)

router.route( '/submitPaper') 
.get( dashboard.getSubmitPaper)
.post(upload.single("file"),dashboard.handleSubmitPaper)

router.get("/user/paperDetails/:id" , dashboard.getPaperDetails)

router.post("/user/update/:id" , upload.single("update"), dashboard.handlePaperUpdate)

 
// ######REVIEWER########### 
router.route("/all")
.get(dashboard.getAll)


router.route("/admin/papers")
.get(dashboard.getAllPapers)

router.get('/admin/viewPaper/:id', dashboard.getDetails)

router.post("/admin/correction/:id" , upload.single("correction"), dashboard.handlePaperCorrection)

router.get("/download/:id" , dashboard.downloadFile)

router.route("/admin/review/:id")
.get(dashboard.reviewPaper)
.post(dashboard.handleReviewPaper)

router.route("/admin/review/edit/:id")
.get(dashboard.getREreview)
.post(dashboard.handleREreview)

// ########SPEAKER###########

router.route("/speaker/add-info/:id")
.get(dashboard.getSpeakerForm)
.post(dashboard.handleSpeakerForm)

// ########ADMIN###########

router.get("/admin/speakers", dashboard.getSpeakers)

// router.route("/admin/speaker/:id")
// .get(dashboard.getManageSpeaker)

router.route("/mark-attendance")
.get(dashboard.getMarkAttendance)
.post(dashboard.handleMarkAttendance)

router.get("/admin/attendance" , dashboard.getAttendance)

router.get("/admin/payments" , dashboard.getPayments)
router.route("/admin/add-sessions")
.get(dashboard.getAddSession)
.post(dashboard.handleAddSession)


router.route("/admin/delete/:id")
.get(dashboard.deletePaper) 










function isLoggedIn(req ,res ,next){
    if(req.isAuthenticated()){
        return next();

    }
    res.redirect("/login")
}

module.exports =  router