const router = require('express').Router();

const user= require('../controllers/user');


// *******ADMIN********

router.route("/admin/create")
.get(user.getCreation)
.post(user.handleCreation)

router.get("/admin/role-player" , user.getRP)

router.put("/admin/role-player/:id/edit" , user.handleEditRP)
// SIGN UP ROUTES

// router.route('/signUp') 
// .get(user.getSignUp)
// .post(user.handleSignUp)

// REGISTER ROUTES
router.route('/register')
.get(user.getRegister)
.post(user.handleRegister)

router.route("/user/send-verification-email")
.get(user.getVerifiedEmail)

router.get("/user/verifyEmail" , user.getVerify)

// #####
// NOT IN YET IN USEED ---------LATER
// #####
router.post("/admin/assign/:id", user.handleAssign) 

 
// LOGIN ROUTES
router.route('/login')
.get(user.getLogin)
.post(user.handleLogin)

router.get("/logout", user.logout)


// *******PROFILE*******

router.route("/profile") 
.get(user.getProfile)

router.route("/public-profile")
.post(user.handlePublicProfile)

// DASH ROUTES
router.get('/regDash', user.getRegDash)

// DASH ROUTES
router.get('/userDash', user.getUserDash)

module.exports =  router