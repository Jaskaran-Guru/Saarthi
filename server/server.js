const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Basic test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Saarthi Real Estate API is running!',
    timestamp: new Date().toISOString()
  });
});

// API Routes - ONLY include routes that exist
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/appointments', require('./routes/appointments'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Saarthi server running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
});

module.exports = app;
