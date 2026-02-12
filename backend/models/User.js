const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
   password: { type: String, required: false }, // Must be false!
    image: { type: String },
    googleId: { type: String, unique: true },
    
    // 👇 YOUR OLD ROLE LOGIC
    role: { type: String, default: 'student' }, // 'student', 'tutor', 'admin'

    // 👇 YOUR OLD NESTED PROFILE
    tutorProfile: {
        subject: { type: String },
        price: { type: Number, default: 0 },
        experience: { type: String },
        about: { type: String },
        
        // 📅 Availability Rules
        availableDays: { type: [String], default: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
        availableTimeStart: { type: String, default: "09:00" },
        availableTimeEnd: { type: String, default: "18:00" },   
        walletBalance: { type: Number, default: 0 }, 
        commissionRate: { type: Number, default: 10 }, 
        
        // 💎 Membership Rules
        allowedPlans: { 
            type: [String], 
            default: ["single", "monthly", "6months", "yearly"] 
        },
        isMembershipActive: { type: Boolean, default: true }
    },
    favorites: [{ 
        type: String  // We use String to store IDs like "t1", "t2"
    }],
}, {
    timestamps: true
});

// 🔒 PASSWORD ENCRYPTION (Required for Login)
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔒 Fix for 'next is not a function' error
// 🔒 Removed 'next' completely to fix the "not a function" crash
userSchema.pre('save', async function () { 
  if (!this.isModified('password')) return;
  if (!this.password) return;

  console.log("🔐 [DEBUG] Hashing password for:", this.email);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;