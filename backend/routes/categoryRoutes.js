const express = require('express');
const router = express.Router();
const Category = require('../models/CategoryModel'); // <--- RIGHT (Two dots)

// @desc    Fetch all categories
// @route   GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;