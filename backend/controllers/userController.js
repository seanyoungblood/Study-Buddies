const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const {MongoClient} = require('mongodb')
const client = new MongoClient(process.env.MONGO_URI)
const db = client.db("StudyBuddy");



// @desc Registers  new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, username, password, phone, email} = req.body

    if ( !firstName || !lastName || !username || !password || !phone || !email ) //|| !username
    {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exist
    const emailExists = await User.findOne({email})
    const usernameExists = await User.findOne({username})
   
    if (emailExists)
    {
        res.status(400)
        throw new Error('User email already exist')
    }
    else if (usernameExists)
    {
        res.status(400)
        throw new Error('Username is already taken')
    }

    // Hashes the Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a user
    const user = await User.create({
        firstName,
        lastName,
        username, 
        password: hashedPassword,
        phone,
        email,
    })

    if (user)
    {
        // 201 status codes means the request was sucessful
        // This is different versus the 200 status code just
        // meaning recieved and understood
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username, 
            password: user.hashedPassword,
            phone: user.phone,
            email: user.email,
            major: user.major,
            classesTaking: user.classesTaking,
            /*likes: user.likes, //user.likes,
            rating: user.rating,*/
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
    const { username, password } = req.body

    // We use findOne becuase this will avoid issues in search
    // MongoDB returns the first document that matches
    // We choose to check by email since this field
    // will always be unique
    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password)))
    {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id),
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


/*
        Search USERS 
        [ USER | GROUPS | COURSES]
        Username, User Major, User Classes, or User Groups
        DONT FORGET: update routes

*/
const searchUser =  asyncHandler(async (req, res) => {

    const { username, major, classesTaking } = req.body
    
    if( !username &&!major && !classesTaking)
    {
        res.status(400)
        throw new Error('Please fill out one field')

    }
    if (!major && !classesTaking)
    {

        const searchFilter = await User.findOne({
            "username": username
        })

        res.status(200).json({
            "username": searchFilter.username})
    }
    if (!username && !classesTaking)
    {
        const searchFilter = await User.findOne({
            "major": major
        })

        res.status(200).json({
            "major": searchFilter.major})

    }
    if(!username && !major)
    {
        const searchFilter = await User.findOne({
            "classesTaking": classesTaking
        })

        res.status(200).json({
            "classesTaking": searchFilter.classesTaking})
        
    }


})

const loadRandUser =  asyncHandler(async (req, res) => {

    const randUser = User.find()

    if (randUser){
        res.status(200).json({
            "username": randUser.username
        })
    }
})





/**
 * TESTING IF WE CAN JUST USE thE MONGO Package 
 * Instead of the mongoose
 */
/*
const registerUser = asyncHandler(async (req, res) => 
{
    const { firstName, lastName, username, password} = req.body;

    const newUser = {firstName,lastName,username,password};
    var error = '';
    console.log(newUser);
    try
    {
        const result = db.collection('users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
})
*/

module.exports = {
    registerUser,
    loginUser,
    getMe,
    searchUser,
    loadRandUser,
}