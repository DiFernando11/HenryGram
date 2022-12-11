// const { schema, model } = require('mongoose');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const schema = mongoose.Schema;

const UserSchema = schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    friends: [
        {
            id: String,
        }
    ],
    rol: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    }
},
    {
        writeConcern: {
            j: true,
            wtimeout: 1000
        }
    }

);

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash(password, salt);
}

UserSchema.methods.matchPassword = async function (password) {
    // Return true or false
    return await bycrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
