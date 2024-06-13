const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CATEGORY = new Schema({
    name: String,
    image: String
})


const SEND_DATA = mongoose.model('category', CATEGORY);

module.exports = SEND_DATA;
