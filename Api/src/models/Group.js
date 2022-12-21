const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        String
    },
    avatar: {
        String
    },
    users: Array,
},
    {
        timestamps: true
    });

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;