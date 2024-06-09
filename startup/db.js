const winston = require("winston");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const config = require("config");

dotenv.config();
console.log(config.get('jwtPrivateKey'))
console.log(process.env.NODE_ENV);

module.exports = function() {
    const db = config.get('db');
    let mongoose_uri='';
    if (process.env.MONGODB_USER && process.env.MONGODB_USER.length > 0 && process.env.MONGODB_PASSWORD && process.env.MONGODB_PASSWORD.length > 0) {
        mongoose_uri=`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`
    } else {
        mongoose_uri=`mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`
    }

    try {   
        mongoose.connect(mongoose_uri).
        then(() => winston.info(`Connected to ${db}...`))
    } catch (error) {
        console.log(error)
    }
}