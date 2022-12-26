const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: Number,
        enums: [
            0,    //'add friend',
            1,    //'requested',
            2,    //'pending',
            3,    //'friends'
        ]
    }
},
    {
        timestamps: true
    });

const Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;