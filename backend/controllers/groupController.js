const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Group = require('../models/groupModel')
const User = require('../models/userModel')
const { group } = require('console')

const {MongoClient} = require('mongodb')
const client = new MongoClient(process.env.MONGO_URI)
const db = client.db("StudyBuddy");


const registerGroup = asyncHandler(async (req, res) => {

    if (!req.body.groupName)
    {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const groups = await Group.create({
        groupName: req.body.groupName,
        course: req.body.course,
        location: req.body.location,
        user: req.user.id,
    })
    //res.status(200).json(groups)
    const user = await User.findById(req.user.id)


       /* const updateGroup = await Group.findByIdAndUpdate(
            req.user.id,
            {"$push": {"members": req.params.id}},
            {new: true}  )*/

    // res.status(200).json(updateGroup)
    res.status(200).json(groups)
    

})


/*const searchGroup = asyncHandler(async (req, res) => {
/**
 * UNDER CONSTRUCTION
 

})*/


const searchGroup = asyncHandler(async (req, res) => {
    var error = '';

    const { groupId, search } = req.body;
    var _search = search.trim();

    const db = client.db("StudyBuddy");
    const results = await db.collection('groups').find({ "groups":{$regex:_search+'.*', $options:'r'} }).toArray();
    var _ret = [];

    for (var i = 0; i < results.length; i++)
    {
        _ret.push( results[i].Groups );
    }

    var ret = { results:_ret, error:''};
    res.status(200).json(ret);
})

module.exports = {
    registerGroup,
    searchGroup
}


 /*const { groupName, course, location} = req.body

    if (!groupName || !course || !location )
    {
        res.status(400)
        throw new Error('Please add all required fields')
    }

    const groupNameExists = await Group.findOne({groupName})
    
    if (groupNameExists)
    {
        res.status(400)
        throw new Error('Group name already exist')
    }*/
