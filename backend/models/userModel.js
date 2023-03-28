const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add a name']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },

},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)