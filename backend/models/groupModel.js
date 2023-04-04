const mongoose = require('mongoose')


const groupSchema = mongoose.Schema({

    groupName: {
        type: String,
        required: [true, 'Please add a the group name'],
        unique: true
    },
    course: {
        type: String,
        required: [true, 'Please add a course name']

    },
    objective: {
        type: String,
        required: [true, 'Please state the objective of the study group']
    },
    date: {
        type: String,
        required: [true, 'Please set the day(s) that group will meet to study']
    },
    time: {
        type: String,
        required: [true, 'Please state what time study group is held']
    },
    location: {
        type: String,
        required: [true, 'Please add the location']
    },
    members: {
        type: [String],
        required: [false, 'Add the members of the study group by {username}']
    },
    reviews: {
        type: [Number],
        required: [false, 'List reviews of study group']
    },
    rating: {
        type: Number,
        required: [false, 'Average of rating for study group']
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    description: {
        type: String,
        required: [false, 'Bio for the group']
    },


    /**
    description: {
        type: String,
        required: false,
    },
    members:{ 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
        required: false
    },

    
     user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
     */

},
{
    timestamps: true
}
)

module.exports = mongoose.model('group', groupSchema)