const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    avatar: {
        type: String
    },
    image: [String]
},
    {
        timestamps: true
    });

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;