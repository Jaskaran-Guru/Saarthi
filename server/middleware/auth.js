// Check if user is authenticated via session
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    success: false, 
    message: 'Access denied. Please log in.' 
  });
};

// Check admin role
const requireAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Please log in.' 
    });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin required.' 
    });
  }
  next();
};

// Check agent role
const requireAgent = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Please log in.' 
    });
  }
  
  if (req.user.role !== 'agent' && req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Agent access required.' 
    });
  }
  next();
};

module.exports = { requireAuth, requireAdmin, requireAgent };
