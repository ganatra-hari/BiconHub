const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/CategoryModel'); // Capital 'C'
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const categories = [
  { 
    name: 'Academic Subjects', 
    description: 'Math, Science, Languages & more', 
    iconName: 'BookOpen', 
    colorTheme: 'blue',
    order: 1
  },
  { 
    name: 'Music & Instruments', 
    description: 'Piano, Guitar, Vocals & more', 
    iconName: 'Music', 
    colorTheme: 'yellow',
    order: 2
  },
  { 
    name: 'Dance & Movement', 
    description: 'Classical, Hip-hop, Contemporary', 
    iconName: 'Heart', 
    colorTheme: 'orange',
    order: 3
  },
  { 
    name: 'Drawing & Painting', 
    description: 'Sketching, Watercolor, Digital Art', 
    iconName: 'Palette', 
    colorTheme: 'purple',
    order: 4
  },
  { 
    name: 'Yoga & Fitness', 
    description: 'Yoga, Meditation, Personal Training', 
    iconName: 'Dumbbell', 
    colorTheme: 'green',
    order: 5
  },
  { 
    name: 'Hobby & Skill Classes', 
    description: 'Photography, Coding, Cooking & more', 
    iconName: 'Lightbulb', 
    colorTheme: 'red',
    order: 6
  },
];

const importData = async () => {
  try {
    await Category.deleteMany(); // Clear existing data
    await Category.insertMany(categories);
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();