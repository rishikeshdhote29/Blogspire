const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URL;

    if (!mongoUri) {
        console.error('MongoDB URI is missing. Set MONGO_URI or MONGODB_URL.');
        return;
    }

    try {
        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
            retryWrites: true,
            w: 'majority'
        };

        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URL prefix:', `${mongoUri.substring(0, 40)}...`);
        
        await mongoose.connect(mongoUri, options);
        console.log('MongoDB connected successfully');
        
    } catch (error) {
         console.log(error);
        
    }
};

module.exports = connectDB;