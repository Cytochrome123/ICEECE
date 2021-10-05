const router = require('express').Router();

const user= require('../controllers/user');


// SIGN UP ROUTES

router.route('/signUp')
.get(user.getSignUp)
.post(user.handleSignUp)

router.post("/admin/assign/:id", user.handleAssign) 
 
// LOGIN ROUTES
router.route('/login')
.get(user.getLogin)
.post(user.handleLogin)

// DASH ROUTES
router.get('/regDash', user.getRegDash)

// DASH ROUTES
router.get('/userDash', user.getUserDash)

module.exports =  router