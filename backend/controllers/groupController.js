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
    const {groupName, course, objective, date, time, location} = req.body
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
        "members":[],
        "admin": req.user.id,
    })
    /*groupName: req.body.groupName,
        course: req.body.course,
        location: req.body.location,
        user: req.user.id, */
    //res.status(200).json(groups)
    const user = await User.findById(req.user.id)

    //groups.members.set(0, user.username)
    await groupie.findOneAndUpdate(
        {"groupName" : groups.groupName},
        {$push:{
            members: req.user.username,
        }},
    )

    await userie.findOneAndUpdate(
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

    await groupie.findOneAndUpdate(
        {"groupName" : groupCheck.groupName},
        {$push:{
            members: req.user.username,
        }},
    )

    await userie.findOneAndUpdate(
        {"username": req.user.username},
        {$push: {
            groupsIn: groupCheck.groupName
        }},
    )
     res.status(200).json(await userie.findOne({"username": req.user.username}))

})

const leaveGroup = asyncHandler(async (req, res) => {
    const { groupName, username } = req.body

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

   await  groupie.findOneAndUpdate(
        {"groupName" : groupCheck.groupName},
        {$pull:{
            members: username
        }},
    )

    await userie.findOneAndUpdate(
        {"username": username},
        {$pull: {
            groupsIn: groupCheck.groupName
        }},
    )
    const userState = await userie.findOne({"username": username})
    await res.status(200).json(userState)
})


/*const searchGroup = asyncHandler(async (req, res) => {
/**
 * UNDER CONSTRUCTION
 

})*/

const editGroup = asyncHandler(async (req, res) => { 

    var error = '';

    const {groupName, course, description, date, time, location} = req.body;

    // const db = client.db("StudyBuddy");
    //db.collection('groups').findOneAndUpdate({groupName:groupName}, { $set: {
        groupie.findOneAndUpdate({groupName:groupName}, { $set: {
        "course":course,
        "description":description,
        "date":date,
        "time":time,
        "location":location
    } })
    
    var ret = {
        groupName:groupName,
        course:course,
        description:description,
        date:date,
        time:time,
        location:location,
        error:'' };
    res.status(200).json(ret);

})

const deleteGroup = asyncHandler(async (req, res) => { 

    var error = '';
  
    const {groupName, username} = req.body;

    userie.findOneAndUpdate(
        {"username": username},
        {$pull: {
            groupsIn: groupName
        }},
    )

    // const db = client.db("StudyBuddy");
    // db.collection('groups').deleteOne({groupName:groupName});
    groupie.deleteOne({groupName:groupName});
  
    var ret = {error:error};
    res.status(200).json(ret);

})

const editRating = asyncHandler(async (req, res) => { 

    var error = '';

    const {username, groupName, rating} = req.body;

    // const db = client.db("StudyBuddy");
    // db.collection('groups').updateOne({groupName:groupName}, { $push: {
   await groupie.updateOne({groupName:groupName}, { $push: {
    //groupie.findOneAndUpdate({groupName:groupName}, { $set: {
        "reviews":rating
    } })

    var ret = {error:''};
    res.status(200).json(await groupie.findOne({"groupName" : groupName}));
})


const searchGroup = asyncHandler(async (req, res) => {
    // incoming: userId, search
      // outgoing: results[], error
    
      var error = '';
    
      const { field, search } = req.body;
      
        // const db = client.db("StudyBuddy");

      // const results = await db.collection('groups').find(
        const results = await groupie.find(
       {$or:[
        {groupName:{$regex:search+'.*',$options:'i'}},
        {course:{$regex:search+'.*',$options:'i'}},
        {objective:{$regex:search+'.*',$options:'i'}}
       ]}).toArray();
      
    // commented below out and just returned "const results"
      /*var ret = [];
      
      for( var i=0; i<results.length; i++ )
      {
        ret.push( results[i].groupName );
        ret.push( results[i].course );
       ret.push( results[i].description );
       ret.push( results[i].date );
       ret.push( results[i].time );
       ret.push( results[i].location );
        ret.push( results[i].members );
       ret.push( results[i].reviews );
       ret.push("$");
       
      }*/
      
      var ret2 = {field:field, search:search, results:results, error:error};
      res.status(200).json(ret2);
})



const searchAdmin = asyncHandler(async (req, res) => {
      var error = '';
      const { search } = req.body;
    // const classes = await Class.find({ user: req.user.id })
      const results = await Group.find({admin: req.user.id});
      var ret2 = {"search":search, "results":results, error:error};
      res.status(200).json(ret2);
})




module.exports = {
    registerGroup,
    searchGroup,
    joinGroup,
    leaveGroup,
    editGroup,
    deleteGroup,
    editRating,
    searchAdmin
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
