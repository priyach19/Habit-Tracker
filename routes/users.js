const express = require('express');
const passport = require('passport');
const router = express.Router();
//importing user_controller module 
const userController = require('../controllers/user_controller');

router.get('/signUp', userController.signUp);
router.get('/signIn', userController.signIn);
router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session',
    passport.authenticate(
        'local',
        { failureRedirect: '/users/signIn' }
    )
    , userController.createSession);

router.get('/sign-out', userController.destroySession);
router.get('/forgetPassword',userController.forgetPassword);
router.post('/changePassword',userController.changePassword);

router.use('/habit', require('./habit'));

module.exports = router;