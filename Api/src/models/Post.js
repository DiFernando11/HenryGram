const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const PostSchema = mongoose.Schema({

        _id:{
            type: String,
            default: uuidv4()
        },
        userId: {
            type: String,
            required: true
        },
        image:[
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
