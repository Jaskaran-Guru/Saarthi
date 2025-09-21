// Quick test version - server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Error:', err));
} else {
  console.log('⚠️ No MongoDB URI found in .env');
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Server working!' });
});

// Mock auth routes for testing
app.get('/api/auth/google', (req, res) => {
  res.redirect('https://accounts.google.com/oauth/authorize?client_id=test');
});

app.get('/api/auth/me', (req, res) => {
  res.json({ success: false, message: 'Not implemented yet' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/test`);
});
