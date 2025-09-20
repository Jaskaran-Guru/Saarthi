const express = require('express');
const passport = require('passport');
const { 
  registerUser, 
  loginUser, 
  googleAuthSuccess, 
  getMe, 
  updateProfile, 
  verifyEmail, 
  logout 
} = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Traditional form authentication
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify/:token', verifyEmail);

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { 
    successRedirect: '/api/auth/google/success',
    failureRedirect: '/api/auth/failure' 
  })
);

router.get('/google/success', googleAuthSuccess);

router.get('/failure', (req, res) => {
  res.status(401).json({ 
    success: false, 
    message: 'Authentication failed' 
  });
});

// Protected routes
router.get('/me', requireAuth, getMe);
router.put('/profile', requireAuth, updateProfile);
router.post('/logout', requireAuth, logout);

module.exports = router;
