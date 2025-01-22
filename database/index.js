const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = process.env.MONGO_URI;
        await mongoose.connect(db);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

module.exports = connectDB;