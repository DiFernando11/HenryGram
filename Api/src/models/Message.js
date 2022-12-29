const mongoose = require('mongoose');
//const { v4: uuidv4 } = require('uuid');

const MessageSchema = mongoose.Schema({
    message: {
        text: { type: String }
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: [String]
},
    {
        timestamps: true
    });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;