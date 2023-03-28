const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Registers  new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password)
    {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exist
    const userExists = await User.findOne({email})

    if (userExists)
    {
        res.status(400)
        throw new Error('User already exist')
    }

    // Hashes the Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user)
    {
        // 201 status codes means the request was sucessful
        // This is different versus the 200 status code just
        // meaning recieved and understood
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        })
    }
    else
    {
        res.status(400)
        throw new Error('Invalid user data')
    }
// res.json({message: 'Regsiter User'})
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser =  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // We use findOne becuase this will avoid issues in search
    // MongoDB returns the first document that matches
    // We choose to check by email since this field
    // will always be unique
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password)))
    {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
            //message: 'THIS IS GOING GREAT'
        })
    }
    else 
    {
        // Message will be seen in the frontend
        res.status(400)
        throw new Error('Invalid user credentials')
    }

   // res.json({message: 'Login User'})
})

// @desc Get a user data
// @route POST /api/users/me
// @access Private
const getMe =  asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
    
    
    // res.json({message: 'User data display'})
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d',

    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}