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
    users: Array,
    sender: { type: String, ref:'User', required: true }
},
    {
        timestamps: true
    });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;