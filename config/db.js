const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB cennected');
    } catch (err) {
        console.log(err.message);
        //Exit
        process.exit(1);
    }
};

module.exports = connectDB;
