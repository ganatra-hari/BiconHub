const express = require('express');
const router = express.Router();
const Booking = require('../models/BookingModel');

// 🔍 DEBUG FLAG: Watch for this message in your terminal!
console.log("✅ CHECKPOINT: Booking Routes Loaded Successfully");

// ---------------------------------------------------------
// 1. GET BOOKINGS (My Orders)
// ---------------------------------------------------------
router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ---------------------------------------------------------
// 2. CREATE BOOKING
// ---------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        // Extract fields
        const { user, tutor, ...rest } = req.body;
        
        // Create booking
        const booking = await Booking.create({
            user,
            tutor,
            ...rest,
            paymentStatus: rest.paymentMethod === 'online' ? 'paid' : 'pending',
            status: 'Confirmed'
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ message: "Booking Failed" });
    }
});

// ---------------------------------------------------------
// 3. CANCEL BOOKING (The DELETE Route)
// ---------------------------------------------------------
router.delete('/:id', async (req, res) => {
    // 🔍 Log the ID to prove the request reached here
    console.log("🗑️ DELETE REQUEST RECEIVED for ID:", req.params.id);
    
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        
        if (!booking) {
            console.log("❌ Booking ID not found in database");
            return res.status(404).json({ message: "Booking not found" });
        }
        
        console.log("✅ Booking deleted from DB");
        res.status(200).json({ message: "Booking Cancelled" });
    } catch (error) {
        console.error("❌ Server Error during delete:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;