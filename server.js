require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, './public')));

// API Routes
app.use('/api/profile', require('./routes/profile'));
app.use('/api/platforms', require('./routes/platforms'));

// Serve index.html for any non-API route (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

const PORT =  4000;
app.listen(PORT, "0.0.0.0",() => {
  console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
});
