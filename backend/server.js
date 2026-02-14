const express = require('express'); // 1. Import Express
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
// const tutorRoutes = require('./routes/tutorRoutes');

const app = express(); // ✅ 2. Initialize 'app' FIRST

// 3. Now you can use app.use()
app.use(cors());
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

// ❌ OLD WAY (Broken on Render)
// const PORT = 5000; 

// ✅ NEW WAY (Works on Render AND Localhost)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});