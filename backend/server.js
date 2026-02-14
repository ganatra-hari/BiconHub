const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// ----------------------------------------------
// ✅ STEP 1: CRASH-PROOF CORS (Allow Everything)
// ----------------------------------------------
// This simple line allows ALL websites. No arrays, no complex rules.
app.use(cors()); 

// ✅ STEP 2: Middleware
app.use(express.json());

// 🔎 LOGGING: This prints to your Render logs so we know it's alive
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

// ✅ STEP 3: Database & Routes
connectDB();

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// ✅ STEP 4: Server Start
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ SERVER IS ALIVE on Port ${PORT}`);
});