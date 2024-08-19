const mongoose = require('mongoose');

const mongooseconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to database')
    } catch (error) {
        console.error("Mongodb connection error: " + error)
        process.exit(1)
    }
}

module.exports = mongooseconnect;