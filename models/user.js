const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
})

const SEND_DATA = mongoose.model('user', userSchema);

module.exports = SEND_DATA;