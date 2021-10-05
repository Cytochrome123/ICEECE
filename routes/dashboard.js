const router = require('express').Router();
const upload = require("../config/multer")
const dashboard  = require('../controllers/dashboard')


// SIGN UP ROUTES 
router.get('/all', dashboard.getAll)

// SIGN UP ROUTES
router.get('/progress', dashboard.getProgress)


// REGISTER ROUTES
router.route('/submitPaper')
.get(dashboard.getSubmitPaper)
.post(upload.single("paper"),dashboard.handleSubmitPaper)

router.route("/admin/papers")
.get(dashboard.getAllPapers)

router.route("/download/:id")
.get(dashboard.downloadPaper)

router.route("/admin/review")
.get(dashboard.reviewPaper)
.post(dashboard.handleReviewPaper)

// REGISTER ROUTES
router.route('/register')
.get(dashboard.getRegister)
.post(dashboard.handleRegister)


module.exports =  router