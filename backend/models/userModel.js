const mongoose = require('mongoose')


const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'Please add a first name']

    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name']

    }, 
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },
    major: {
        type: String,
        required: [false, 'Please add a first major']

    },
    classesTaking: {
        type: [String],
        required: [false, 'Please add classes']
    },
    groupsIn: {
        type: [String],
        required: [false, 'Please add the group user is in']
    },
    verified: {
        type: Boolean,
        required: [false, 'Please verify']
    },
    code: {
        type: Number,
        required: [false, 'Enter code for verification.']
    },

},
{
    timestamps: true
}
)

module.exports = mongoose.model('user', userSchema)
