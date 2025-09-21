const express = require('express');
const passport = require('passport');
const { googleAuthSuccess, getMe, logout } = require('../controllers/authController');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleAuthSuccess
);

router.get('/me', getMe);
router.post('/logout', logout);

module.exports = router;
