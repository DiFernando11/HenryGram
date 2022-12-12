const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const FriendSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    requester: { type: Schema.Types.ObjectId, ref: 'Users' },
    recipient: { type: Schema.Types.ObjectId, ref: 'Users' },
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

const Friend = mongoose.model('Friedn', FriendSchema);

module.exports = Friend;