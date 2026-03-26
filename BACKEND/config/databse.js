const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Add connection options for better reliability
        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4, // Use IPv4, skip IPv6
            retryWrites: true,
            w: 'majority'
        };

        console.log("Attempting to connect to MongoDB...");
        console.log("MongoDB URL:", process.env.MONGO_URI?.substring(0, 50) + "...");
        
        await mongoose.connect(process.env.MONGO_URI, options);
        console.log("✓ MongoDB Connected Successfully");
        
    } catch (error) {
        console.log(error);
        console.error("✗ MongoDB Connection Error:");
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
        console.error("Hostname:", error.hostname);
        
        // Provide helpful diagnostics
        if (error.code === 'ECONNREFUSED') {
            console.error("\n⚠ TROUBLESHOOTING STEPS:");
            console.error("1. Check your internet connection");
            console.error("2. Verify MongoDB Atlas IP Whitelist - add your IP: https://cloud.mongodb.com/");
            console.error("3. Ensure your MONGODB_URL in .env is correct");
            console.error("4. Check if firewall is blocking outbound connections to MongoDB");
            console.error("5. Try connecting from a different network");
        }
        
        // Exit process if critical
        process.exit(1);
    }
};

module.exports = connectDB;