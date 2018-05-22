const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    description: String,
    createdAt: Date,
    shortCreatedAt: String,
    author: String,
    photoLink: String,
    likes: [String],
    hashtags: [String],
});

module.exports = mongoose.model('Post', PostSchema);
