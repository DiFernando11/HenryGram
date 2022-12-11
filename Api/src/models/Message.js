const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MessageSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    message: {
        text: { type: String, required: true }
        // you can add any other properties to the message here.
        // for example, the message can be an image ! so you need to tweak this a little
    },
    // if you want to make a group chat, you can have more than 2 users in this array
    users: [{
        userId: { type: String, required: true }
    }],
    sender: { type: String, required: true },
    read: { type: Date }
},
    {
        timestamps: true
    });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;