const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Group = require('../models/groupModel')
const User = require('../models/userModel')
//const { group } = require('console') NOT SURE WHERE THIS LINE CAME FROM BUT NOT CAUSING ANY ISSUE

const {MongoClient} = require('mongodb')
const client = new MongoClient(process.env.MONGO_URI)
const db = client.db("StudyBuddy");
const groupie = db.collection('groups');
const userie = db.collection('users');


const registerGroup = asyncHandler(async (req, res) => {
    const {groupName, course, objective, date, time, location, } = req.body
    if (!groupName || !course || !objective || !date || !time || !location)
    {
        res.status(400)
        throw new Error('Please add all field')
    }

    const groups = await Group.create({
        groupName,
        course,
        objective,
        date, 
        time,
        location,
        "admin": req.user.id,
    })
    /*groupName: req.body.groupName,
        course: req.body.course,
        location: req.body.location,
        user: req.user.id, */
    //res.status(200).json(groups)
    const user = await User.findById(req.user.id)

    //groups.members.set(0, user.username)
    groupie.findOneAndUpdate(
        {"groupName" : groups.groupName},
        {$push:{
            members: req.user.username,
        }},
    )

    userie.findOneAndUpdate(
        {"username": user.username},
        {$push: {
            groupsIn: groups.groupName
        }},
    )

    // res.status(200).json(updateGroup)
    res.status(200).json(groups)
    

})

const joinGroup = asyncHandler(async (req, res) => {
    const { groupName } = req.body

    if (!groupName)
    {
        res.status(400)
        throw new Error('Please add groupName input')   
    }

    const groupCheck = await groupie.findOne({"groupName" : groupName})


    if (!groupCheck)
    {
        res.status(400)
        throw new Error('Group does NOT exist')
    }

    groupie.findOneAndUpdate(
        {"groupName" : groupCheck.groupName},
        {$push:{
            members: req.user.username,
        }},
    )

    userie.findOneAndUpdate(
        {"username": req.user.username},
        {$push: {
            groupsIn: groupCheck.groupName
        }},
    )

    res.status(200).json(req.user)

})

const leaveGroup = asyncHandler(async (req, res) => {
    const { groupName } = req.body

    if (!groupName)
    {
        res.status(400)
        throw new Error('Please add groupName to LEAVE')   
    }

    const groupCheck = await groupie.findOne({"groupName" : groupName})


    if (!groupCheck)
    {
        res.status(400)
        throw new Error('Group does NOT exist')
    }
    // { $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } }

    groupie.findOneAndUpdate(
        {"groupName" : groupCheck.groupName},
        {$pull:{
            members: req.user.username
        }},
    )

    userie.findOneAndUpdate(
        {"username": req.user.username},
        {$pull: {
            groupsIn: groupCheck.groupName
        }},
    )
    res.status(200).json(groupCheck.members)
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
    searchGroup,
    joinGroup,
    leaveGroup,
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
