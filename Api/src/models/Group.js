const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String
    },
    avatar: {
        type: String
    },
    users: Array,
    pendings: Array
},
    {
        timestamps: true
    });

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;