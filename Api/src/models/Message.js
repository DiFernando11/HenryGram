const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MessageSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    message: {
        text: { type: String, required: true }
    },
    users: [{
        userId: { type: String, required: true }
    }],
    sender: { type: String, required: true }
},
    {
        timestamps: true
    });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;