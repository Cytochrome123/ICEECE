const router = require("express").Router();
// const upload = require("../config/multer")
const multer = require("multer");
const { storage, upload } = require("../config/multer");
const methodOverride = require("method-override");
const dashboard = require("../controllers/dashboard");
// const {isLoggedIn} = require("../app")

router.get("/", dashboard.getHome);
router.get("/dashboard", dashboard.getDashboard);
router.get("/contacts", dashboard.getContacts);

//###########USER#######

router
    .route("/user/payment-confirmation")
    .get(dashboard.getPaymentConfirmation)
    .post(dashboard.handlePaymentConfirmation);

router.get("/session", dashboard.getSession);
router.get("/session/:id", dashboard.getSessionDetails);

router
    .route("/submitPaper")
    .get(dashboard.getSubmitPaper)
    .post(upload.single("file"), dashboard.handleSubmitPaper);

router.get("/user/paperDetails/:id", dashboard.getPaperDetails);

router.post(
    "/user/update/:id",
    upload.single("update"),
    dashboard.handlePaperUpdate,
);

// ######REVIEWER###########

router.route("/admin/papers").get(dashboard.getAllPapers);

router.get("/admin/viewPaper/:id", dashboard.getDetails);

router.post(
    "/admin/correction/:id",
    upload.single("correction"),
    dashboard.handlePaperCorrection,
);

router.get("/download/:id", dashboard.downloadFile);

router
    .route("/admin/review/:id")
    .get(dashboard.reviewPaper)
    .post(dashboard.handleReviewPaper);

router
    .route("/admin/review/edit/:id")
    .get(dashboard.getREreview)
    .post(dashboard.handleREreview);

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
    .get(dashboard.getMarkAttendance)
    .post(dashboard.handleMarkAttendance);

router.get("/admin/attendance", dashboard.getAttendance);

router.get("/admin/payments", dashboard.getPayments);

router
    .route("/admin/approve-payment/:id")
    // .get(dashboard.getAToApprove)
    .post(dashboard.handleApprovePayment);

router
    .route("/admin/add-sessions")
    // .get(dashboard.getAddSession)
    .post(dashboard.handleAddSession);


router.route("/admin/session/:id")
.put(dashboard.handleEditSession)
.delete(dashboard.deleteSession)

router.route("/admin/delete/:id").get(dashboard.deletePaper);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;