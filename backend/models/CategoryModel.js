const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  iconName: { type: String, required: true }, // We will store the icon string name (e.g., "BookOpen")
  colorTheme: { type: String, required: true }, // e.g., "blue", "yellow"
  order: { type: Number, default: 0 } // To control sorting order
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);