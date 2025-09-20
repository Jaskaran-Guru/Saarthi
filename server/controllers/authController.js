const User = require('../models/User');
const { trackInteraction } = require('../middleware/trackingMiddleware');

// @desc    Google OAuth Success
// @route   GET /api/auth/google/success
// @access  Public
const googleAuthSuccess = async (req, res) => {
  try {
    if (req.user) {
      // Track successful login
      await trackInteraction(req, 'login', {
        authMethod: 'google',
        loginTime: new Date()
      });

      res.redirect(`${process.env.CLIENT_URL}/auth/success`);
    } else {
      res.redirect(`${process.env.CLIENT_URL}/auth/failure`);
    }
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/auth/failure`);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }

    const user = await User.findById(req.user.id).select('-password -__v');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    // Track logout
    await trackInteraction(req, 'logout', {
      logoutTime: new Date()
    });

    req.logout((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Logout failed' });
      }
      
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Session destroy failed' });
        }
        
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'Logged out successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};

module.exports = {
  googleAuthSuccess,
  getMe,
  logout
};
