const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    
}, {
    timestamps: true,
})

module.exports = mongoose.model('Class Model', classSchema)
