const router = require("express").Router();
// const upload = require("../config/multer")
const multer = require("multer");
const { storage, upload } = require("../config/multer");
const methodOverride = require("method-override");
const dashboard = require("../controllers/dashboard");
// const isLoggedIn = require("../app")

router.get("/", isLoggedIn , dashboard.getHome);
router.get("/dashboard", isLoggedIn, dashboard.getDashboard);
router.get("/contacts", isLoggedIn , dashboard.getContacts);

//###########USER#######

router
    .route("/user/payment-confirmation")
    .get(isLoggedIn , dashboard.getPaymentConfirmation)
    .post(isLoggedIn , dashboard.handlePaymentConfirmation);

router.get("/session", isLoggedIn , dashboard.getSession);
router.get("/session/:id", isLoggedIn , dashboard.getSessionDetails);

router
    .route("/submitPaper")
    .get(isLoggedIn , dashboard.getSubmitPaper)
    .post(upload.single("file"), isLoggedIn , dashboard.handleSubmitPaper);

router.get("/user/paperDetails/:id", isLoggedIn , dashboard.getPaperDetails);

router.post(
    "/user/update/:id",
    upload.single("update"),
    dashboard.handlePaperUpdate,
);

// ######REVIEWER###########

router.route("/admin/papers").get(isLoggedIn , dashboard.getAllPapers);

router.get("/admin/viewPaper/:id", isLoggedIn , dashboard.getDetails);

router.post(
    "/admin/correction/:id",
    upload.single("correction"),
    dashboard.handlePaperCorrection,
);

router.get("/download/:id", isLoggedIn , dashboard.downloadFile);

router
    .route("/admin/review/:id")
    .get(isLoggedIn , dashboard.reviewPaper)
    .post(isLoggedIn , dashboard.handleReviewPaper);

router
    .route("/admin/review/edit/:id")
    .get(isLoggedIn , dashboard.getREreview)
    .post(isLoggedIn , dashboard.handleREreview);

// ########SPEAKER###########-------CAMERA READY

router.route("/session/:id/add-info")
.put(upload.single("file"),dashboard.handleCameraReady);


// ___SLIDE____
router.put("/session/:id/add-slide", upload.single("file"), dashboard.handleSlide);


// ########ADMIN###########



// router.route("/admin/speaker/:id")
// .get(dashboard.getManageSpeaker)

router
    .route("/mark-attendance")
    .get(isLoggedIn , dashboard.getMarkAttendance)
    .post(isLoggedIn , dashboard.handleMarkAttendance);

router.get("/admin/attendance", isLoggedIn , dashboard.getAttendance);

router.get("/admin/payments", isLoggedIn , dashboard.getPayments);

router
    .route("/admin/approve-payment/:id")
    // .get(dashboard.getAToApprove)
    .post(isLoggedIn , dashboard.handleApprovePayment);

router
    .route("/admin/add-sessions")
    // .get(dashboard.getAddSession)
    .post(isLoggedIn , dashboard.handleAddSession);


router.route("/admin/session/:id")
.put(isLoggedIn , dashboard.handleEditSession)
.delete(isLoggedIn , dashboard.deleteSession)

router.route("/admin/delete/:id").get(isLoggedIn , dashboard.deletePaper);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;