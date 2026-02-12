const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 👇 I removed the < > brackets for you.
    // I assumed your password is 'hari_atlas' based on your text. 
    // If it is 'hari123', change it below.
    const uri = "mongodb+srv://hari_atlas:hari_atlas@biconhub-cluster.qemnoju.mongodb.net/?appName=BiconHub-Cluster";

    console.log("📡 Connecting to New Atlas Cluster...");
    
    // We add specific options to help with Hotspot connections
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if blocked
      family: 4 // Force IPv4 (Helps with Hotspot DNS)
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ CONNECTION ERROR: ${error.message}`);
    
    // 👇 If this happens, we know it's the Hotspot Issue
    if (error.message.includes("querySrv") || error.message.includes("ECONNREFUSED")) {
      console.log("\n⚠️  HOTSPOT DETECTED: The 'Short String' failed.");
      console.log("👉 Please go to Atlas -> Connect -> Drivers -> Node.js -> Version 2.2.12");
      console.log("👉 Copy the LONG string (starting with 'mongodb://') and paste it here.");
    }
    process.exit(1);
  }
};

module.exports = connectDB;