const mongoose = require('mongoose')


const groupSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    groupName: {
        type: String,
        required: [true, 'Please add a the group name'],
        unique: true
        
    },
    course: {
        type: String,
        required: [true, 'Please add a course name']

    },
    location: {
        type: String,
        required: [true, 'Please add the location']
    },
    description: {
        type: String,
        required: false,
    },
    members:{ 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: false
    },

},
{
    timestamps: true
}
)

module.exports = mongoose.model('Group', groupSchema)