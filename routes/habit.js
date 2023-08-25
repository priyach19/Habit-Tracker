const express = require('express');
const passport = require('passport');
const habitController = require('../controllers/habit_controller')

const router = express.Router();
// routes for create,remove,makr favourite,update status

router.post('/create', passport.checkAuthentication, habitController.createHabit);
router.get('/favorite-habit', habitController.favoriteHabit);
router.get('/remove', habitController.destroyHabit);
router.get('/status-update', habitController.statusUpdate);

module.exports = router;