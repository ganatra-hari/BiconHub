const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 🔍 DEBUG: Log specifically when this route file is loaded
console.log("📂 [DEBUG] userRoutes.js loaded successfully");

// 1. SYNC ROUTE (Login/Register)
router.post('/sync', async (req, res) => {
    const { email, image, googleId, name } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            console.log("🔍 [SYNC] Existing user found. Updating profile...");
            // Update profile info but DO NOT touch the favorites array here
            user.image = image || user.image;
            user.googleId = googleId;
            await user.save();
            return res.json(user);
        }

        console.log("🆕 [SYNC] Creating new user entry...");
        user = await User.create({
            name, 
            email, 
            image, 
            googleId,   
            role: 'student',
            favorites: [] 
        });
        res.status(201).json(user);
    } catch (error) {
        console.error("❌ [SYNC ERROR]:", error);
        res.status(500).json({ message: "Sync error", error: error.message });
    }
});

// 2. TOGGLE FAVORITE ROUTE (The fix for multiple likes)
router.post('/toggle-favorite', async (req, res) => {
    const { userId, tutorId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if tutor is already in favorites
        const isFavorited = user.favorites.includes(tutorId);

        if (isFavorited) {
            // Remove from list if already there
            user.favorites = user.favorites.filter(id => id.toString() !== tutorId);
            console.log(`💔 Removed tutor ${tutorId} from favorites`);
        } else {
            // Add to list if not there
            user.favorites.push(tutorId);
            console.log(`❤️ Added tutor ${tutorId} to favorites`);
        }

        await user.save();
        // Return the full updated favorites array
        res.json(user.favorites);
    } catch (error) {
        console.error("❌ [FAVORITE ERROR]:", error);
        res.status(500).json({ message: "Error updating favorites" });
    }
});

// 3. GET FAVORITES ROUTE (To show on your Liked Tutors page)
router.get('/favorites/:userId', async (req, res) => {
    try {
        // .populate('favorites') allows you to see the tutor details (name, subject, etc)
        const user = await User.findById(req.params.userId).populate('favorites');
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: "Error fetching favorites" });
    }
});

// ---------------------------------------------------------
// TOGGLE FAVORITE (Add/Remove)
// ---------------------------------------------------------
router.put('/favorites/:userId', async (req, res) => {
    const { tutorId } = req.body; // We send "t1" or "t2"
    
    try {
        const user = await User.findById(req.params.userId);

        if (user) {
            // Check if already favorite
            if (user.favorites.includes(tutorId)) {
                // Remove it (Filter it out)
                user.favorites = user.favorites.filter(id => id !== tutorId);
                await user.save();
                res.json({ message: "Removed from favorites", favorites: user.favorites });
            } else {
                // Add it
                user.favorites.push(tutorId);
                await user.save();
                res.json({ message: "Added to favorites", favorites: user.favorites });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// ---------------------------------------------------------
// GET FAVORITES
// ---------------------------------------------------------
router.get('/favorites/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user) {
            res.json(user.favorites);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;