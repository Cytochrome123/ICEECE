const router = require('express').Router();
const methodOverride = require("method-override");
const user= require('../controllers/user');


// *******ADMIN********

router.route("/direct-live/attendance")
.get(user.getDirectAttendance)
.post(user.directAttendance)
router.get("/direct-live" , user.directLive)
router.route("/admin/create")
.get(isLoggedIn , user.getCreateRP)
.post(isLoggedIn , user.handleCreateRP)

router.get("/admin/role-player", isLoggedIn , user.getRP)
router.put("/admin/role-player/:id" , isLoggedIn , user.editRP)
router.delete("/admin/role-player/:id" , isLoggedIn , user.deleteRP)

router.route("/participants").get(isLoggedIn ,user.getAll);

router.get("/admin/participants", isLoggedIn , user.getAll);

router.get("/admin/presenters", isLoggedIn ,user.getPresenters);
router.route("/admin/presenter/:id" )
.put(isLoggedIn , user.editPresenter)
.delete(isLoggedIn , user.deletePresenter)

router.get("/admin/speakers", isLoggedIn , user.getSpeakers);


// REGISTER ROUTES
router.route('/register')
.get(user.getRegister)
.post(user.handleRegister)

router.route("/user/send-verification-email")
.get(isLoggedIn , user.getVerifiedEmail)

router.get("/user/verifyEmail" , isLoggedIn , user.getVerify)



router.post("/admin/assign/:id", isLoggedIn , user.handleAssign) 

 
// LOGIN ROUTES
router.route('/login')
.get(user.getLogin)
.post(user.handleLogin)

router.get("/logout", user.logout)


// *******PROFILE*******

router.route("/profile") 
.get(isLoggedIn , user.getProfile)

router.route("/public-profile")
.post(isLoggedIn , user.handlePublicProfile)

// DASH ROUTES
router.get('/regDash', user.getRegDash)

// DASH ROUTES
router.get('/userDash', user.getUserDash)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports =  router