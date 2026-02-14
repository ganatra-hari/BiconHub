const express = require('express'); // 1. Import Express
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
// const tutorRoutes = require('./routes/tutorRoutes');

const app = express(); // ✅ 2. Initialize 'app' FIRST

app.use(cors({
    origin: [
        "http://localhost:5173",                      // Allow local testing
        "https://biconhub-frontend.onrender.com"      // Allow live frontend
    ],
    credentials: true
}));

app.options('*', cors());

app.use(express.json());

// 🔎 DEBUG SENSOR: Logs every single request
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} to ${req.url}`);
  next();
});

connectDB();

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', bookingRoutes);
// app.use('/api/tutors', tutorRoutes); // This makes the URL /api/tutors
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n✅ SERVER STARTED successfully on PORT: ${PORT}`);
    console.log(`🌐 Visit: http://localhost:${PORT} or your Render URL\n`);
});

// Handle server errors (like port in use)
server.on('error', (err) => {
    console.error("❌ Server Error:", err);
});