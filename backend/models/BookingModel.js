const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    // ✅ USER: Keep as ObjectId (Links to your real user account)
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    
    // ⚠️ TUTOR: MUST BE STRING (To accept 't1', 't2', etc.)
    tutor: { 
        type: String, 
        required: true 
    },

    // String fields for display
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    tutorName: { type: String, required: true },
    subject: { type: String, required: true },
    
    date: { type: String, required: true },
    time: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'Pending' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);