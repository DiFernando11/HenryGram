const mongoose = require('mongoose');
//const { v4: uuidv4 } = require('uuid');

const MessageSchema = mongoose.Schema({
    message: {
        text: { type: String, required: true }
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true
    });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;