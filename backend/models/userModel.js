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
    /*likes:{ 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: false
    },
    rating: {
        type: Number,
        required: [false, 'TBH/RATE']
    }*/

},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)
