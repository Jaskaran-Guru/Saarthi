const express = require('express');
const router = express.Router();

// Basic route for testing
router.get('/', (req, res) => {
  res.json({ 
    message: 'Saarthi API Index Route',
    status: 'success',
    version: '1.0.0'
  });
});

// Health check route
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
