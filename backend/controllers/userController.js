const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
// Database connection and db-related variable initialization
const {MongoClient} = require('mongodb')
const client = new MongoClient(process.env.MONGO_URI)
const db = client.db("StudyBuddy");
const User2 = db.collection('users');
const nodemailer = require('nodemailer');

// @desc Reset password by taking a username/email combo and sending a link to reset
// @route POST /api/users
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
    const { username, email } = req.body
    
    const emailExists = await User.findOne({email})
    const usernameExists = await User.findOne({username})
    
    // check for all fields
    if (!email || !username) 
    {
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    // check that fields exist
    if (!emailExists || !usernameExists)
    {
        res.status(400)
        throw new Error('User/email does not exist')
    }
    
    // check that the email provided matches the username provided
    if (usernameExists.email != email || emailExists.username != username)
    {
           res.status(400)
        throw new Error('User/email do not match')
    }

    // EMAIL:
        // sending email
        const transporter =  nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: "user-verification-4331@outlook.com",
                pass: "$COP4331$",
            }
        });
        
        // recieving email and options
        const options = {
            from: "user-verification-4331@outlook.com",
            to: email,
            subject: "Reset Password",
            text: "Frontend complete with link to page with editUser API that allows password reset" // text field may need to be changed to html to add a link
        };
        
        // send email
        transporter.sendMail(options, function(err, info){
          if(err){
             console.log(err);
             return;
         }
         console.log("Sent: " + info.response);  
         })
     res.status(201).json({username:username, email:email});
})

// @desc Registers a user and sends them a link to verify thier email
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, username, password, phone, email} = req.body
    
    // check that all required registration fields are present
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
    const code = Math.floor(Math.random() * 9000 + 1000);
    const user = await User.create({
        firstName,
        lastName,
        username, 
        password: hashedPassword,
        "verified": false,
        phone,
        email,
        code,
        "groupsIn": [],
        "classesTaking":[]
    })
    
    // EMAIL:
    if (user)
    {
      // sender
      const transporter =  nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: "user-verification-4331@outlook.com",
                pass: "$COP4331$",
            }
        });
         
        // reciever plus options
        const options = {
            from: "user-verification-4331@outlook.com",
            to: email,
            subject: "Study Buddies - Verification Email - " + code,
            text: "Before you can start using our platform, you'll need to verify your account. Here are the steps you need to follow:\n\n 1. Navigate to the verification code field, which you'll find in your account settings.\n 2. Take this 4 digit code: " + code + " you have been provided and copy it into the verification code field.\n 3. Click the verify button.\n\nThat's it! Once you've completed these steps, your account will be fully verified and you'll be able to start using all the features of Study Buddies.\n\nBest regards,\nStudy Buddies Team"
        };
        
        // send the email
        transporter.sendMail(options, function(err, info){

            if(err){
                console.log(err);
                return;
            }
            console.log("Sent: " + info.response);      
        })
        
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
            code: user.code,
            major: user.major,
            groupsIn: user.groupsIn,
            classesTaking: user.classesTaking,
            verified:false,
            // likes: user.likes, //user.likes,
            // rating: user.rating,
            token: generateToken(user.id),
        })
    }
    else
    {
        res.status(400).json({_id: -1})
       // throw new Error('Invalid user data')
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
    
    // compare the hashed password
    if (user && (await bcrypt.compare(password, user.password)))
    {
        res.status(201).json({
            _id: user.id,
            "firstName": user.firstName ,
            "lastName": user.lastName,
            username: user.username,
            phone: user.phone,//CHANGED BY ADAM
            email: user.email,
            major: user.major, //CHANGED BY ADAM
            classesTaking: user.classesTaking, //CHANGED BY ADAM
            verified: user.verified,
            code:user.code,
            groupsIn: user.groupsIn,
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
    
    // check for one of three fields
    if( !username && !major && !classesTaking)
    {
        res.status(400)
        throw new Error('Please fill out one field')
    }
    // check if field is username
    if (!major && !classesTaking)
    {
        const searchFilter = await User.findOne({
            "username": username
        })

        res.status(200).json({
            "username": searchFilter.username})
    }
    // check if field is major
    if (!username && !classesTaking)
    {
        const searchFilter = await User.findOne({
            "major": major
        })

        res.status(200).json({
            "major": searchFilter.major})
    }
    // field must be classesTaking
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

// edit by username
const editUser = asyncHandler(async (req, res) => {
    var error = '';

    const {firstName, lastName, username, phone, verified} = req.body;

    //const db = client.db("StudyBuddy");
    //db.collection('users').findOneAndUpdate({username:username}, { $set: {
        // set variables
        User2.findOneAndUpdate({username:username}, { $set: {
        "firstName":firstName,
        "lastName":lastName,
        "phone":phone,
         "verified":verified
    } })
    
    var ret = {
        firstName:firstName,
        lastName:lastName,
        username:username,
        phone:phone,
        error:'' };
    res.status(200).json(ret);

})

// add up to 6 classes
const addClasses = asyncHandler(async (req, res) => {

    var error = '';

    const {username, class0, class1, class2, class3, class4, class5} = req.body;

    //const db = client.db("StudyBuddy");
    //db.collection('users').findOneAndUpdate({username:username}, { $set: {
        // clears classes each time it is called (to simulate a new semester)
        // frontend simply passes the classes being taken in the current semester
        await User2.findOneAndUpdate({username:username}, { $set: {
        "classesTaking.0":class0,
        "classesTaking.1":class1,
        "classesTaking.2":class2,
        "classesTaking.3":class3,
        "classesTaking.4":class4,
        "classesTaking.5":class5
    } })

    //var ret = {_id: req.user.id};
   // res.status(200).json(ret);
    const user = await User.findOne({ username })

    if (user)
    {
        res.status(201).json({
            _id: user.id,
            "firstName": user.firstName ,
            "lastName": user.lastName,
            username: user.username,
            email: user.email,
            phone:user.phone,
            groupsIn: user.groupsIn,
            major: user.major, //CHANGED BY ADAM
            classesTaking: user.classesTaking, //CHANGED BY ADAM
            token: generateToken(user.id),
        })
    }
    else 
    {
        // Message will be seen in the frontend
        res.status(400)
        throw new Error('Invalid user credentials')
    }
})

// big sad
const deleteUser = asyncHandler(async (req, res) => { 
    var error = '';

    const {username} = req.body;
  
    // const {username} = req.body;

    // const db = client.db("StudyBuddy");
    // db.collection('users').deleteOne({username:username});
    User2.deleteOne({username:username});
  
    var ret = {error: 0};
    res.status(200).json(ret);
})

const verifyUser = asyncHandler(async (req, res) => { 

    const { username , codeInput } = req.body

    const user = await User.findOne({
        username
    })

    if (user){

        if (user.code === parseInt(codeInput))
        {
            await User2.findOneAndUpdate({username:username}, 
            { $set: 
                {
                    "verified" : true
                }
            })

            res.status(200).json(await User2.findOne({"username": username}))
        
        }
        else
        {
            res.status(400)
            throw new Error('Code does NOT match, cannot verify. Please enter the correct code.')

        }
    }
    else
    {
        res.status(400)
            throw new Error('User does NOT exist.')
    }

})

/**
 * TESTING IF WE CAN JUST USE thE MONGO Package 
 * Instead of the mongoose
 */

/*const registerUser = asyncHandler(async (req, res) => 
{
    const { firstName, lastName, username, password} = req.body;

    const newUser = {firstName,lastName,username,password};
    var error = '';
    console.log(newUser);
    try
    {
        const result = User2.insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
})*/

// routing
module.exports = {
    verifyUser,
  resetPassword,
    registerUser,
    loginUser,
    getMe,
    searchUser,
    loadRandUser,
    editUser,
    addClasses,
    deleteUser,
}
