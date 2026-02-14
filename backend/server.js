const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// =====================================================
// 🛡️ MANUAL CORS OVERRIDE (Bypasses external packages)
// =====================================================
app.use((req, res, next) => {
    // 1. Allow everyone
    res.header("Access-Control-Allow-Origin", "*");
    
    // 2. Allow specific headers
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    // 3. Allow specific methods
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    // 4. Handle the "Preflight" (Handshake) immediately
    if (req.method === 'OPTIONS') {
        return res.status(200).send({});
    }
    
    next();
});

// =====================================================
// 📡 LOGGING (To prove the request arrived)
// =====================================================
app.use((req, res, next) => {
    console.log(`📡 HIT: ${req.method} ${req.url}`);
    next();
});

// Middleware
app.use(express.json());

// Database
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n✅ MANUAL SERVER RUNNING on Port ${PORT}`);
});