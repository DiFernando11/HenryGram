const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: [
        {
            url: String,
        }
    ],
    description: {
        type: String,
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    },
    isMatch: {
        type: Boolean,
        default: false
    },
    hashtags: [
        {
            type: String,
        }
    ],
    comments: [
        {
            description: String,
            userId: String,
            date: Date
        }
    ],
    likes: [
        {
            userId: String,
        }
    ],
    matches: [
        {
            userId: String,
        }
    ],
    created: {
        type: Date,
        default: Date.now
    },
    group: {
        type: String
    }
},
    {
        writeConcern: {
            j: true,
            wtimeout: 1000
        }
    }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
