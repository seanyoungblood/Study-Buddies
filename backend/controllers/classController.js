const asyncHandler = require('express-async-handler')
const Class = require('../models/classModel')
const User = require('../models/userModel')

const getClass = asyncHandler(async (req, res) => {
    const classes = await Class.find({ user: req.user.id })
    res.status(200).json(classes)
})

const setClass = asyncHandler(async (req, res) => {
    if (!req.body.text)
    {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const classes = await Class.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(classes)
})



const updateClass = asyncHandler(async (req, res) => {
    const classes = await Class.findById(req.params.id)

    if (!classes){
        res.status(400)
        throw new Error('Class not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if (!user)
    {
        res.status(401)
        throw new Error('User not found')
    }

    // makes sure that the logged in user matches the class user
    if (classes.user.toString() !== user.id)
    {
        res.status(401)
        throw new Error('User not authorized')   
    }

    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { 
        new: true,
    })

    res.status(200).json(updatedClass)
})

const deleteClass = asyncHandler(async (req, res) => {

    const classes = await Class.findById(req.params.id)

    // check for classes 
    if (!classes){
        res.status(200)
        throw new Error('Class doesn not exist to delete')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if (!user)
    {
        res.status(401)
        throw new Error('User not found')
    }

    // makes sure that the logged in user matches the class user
    if (classes.user.toString() !== user.id)
    {
        res.status(401)
        throw new Error('User not authorized')   
    }

    // DO NOT USE .remove(), not a function in MongoDB anymore
    // we use .deleteMany or .deleteOne
    await classes.deleteOne()
    res.status(200).json({id: req.params.id})

    /*
    const classes = await Class.findById(req.params.id)

    if (!classes){
        res.status(200)
        throw new Error('Class doesn not exist to delete')
    }

    const deletedClass = await Class.findByIdAndDelete(req.params.id, req.body)

    res.status(200).json(`Class Deleted: ${deletedClass}`)
    */
})


module.exports = {
    getClass,
    setClass,
    updateClass,
    deleteClass,
}