const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BLOG = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
})

const SEND_DATA = mongoose.model('blog', BLOG);

module.exports = SEND_DATA;