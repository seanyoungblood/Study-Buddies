require('express');
require('mongodb');
exports.setApp = function ( app, client )
{

/* USERS ***************************************************************/
// LOGIN API
// Works, valid users can login, invalid users can not.
// Return values need work, when logging in through ARC, firstName lastName are not returned however...
// when loging in through website, firstName lastName are properly returned.
// Implement JWT.
app.post('/api/login', async (req, res, next) => 
{    
 
    var error = '';
    
    const { login, password } = req.body;

  
    const db = client.db("StudyBuddy");
    const results = await db.collection('users').find({username:login,password:password}).toArray();
  
    var id = -1;
    var fn = '';
    var ln = '';
  
    if( results.length > 0 )
    {
        id = results[0]._id;
        fn = results[0].firstName;
        ln = results[0].lastName;
    }

    var ret = { firstName:fn, lastName:ln, _id:id, error:'' };
    res.status(200).json(ret);
});
  
// REGISTER API
// Works.
// Need to implement email verification.
// Does not require JWT.
app.post('/api/register', async (req, res, next) =>
{
    const { firstName, lastName, username, password} = req.body;

    const newUser = {firstName:firstName,lastName:lastName,username:username,password:password};
    var error = '';
    //console.log(newUser);
    try
    {
        const db = client.db("StudyBuddy");
        const result = db.collection('users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

// EDIT USER API
// Complete
app.put('/api/editUser', async (req, res, next) => 
{    
    var error = '';

    const {firstName, lastName, username, password, phone, email, major} = req.body;

    const db = client.db("StudyBuddy");
    db.collection('users').findOneAndUpdate({username:username}, { $set: {
        "firstName":firstName,
        "lastName":lastName,
        "password":password,
        "phone":phone,
        "email":email,
        "major":major,
    } })
    
    var ret = {
        firstName:firstName,
        lastName:lastName,
        username:username,
        password:password,
        phone:phone,
        email:email,
        major:major,
        error:'' };
    res.status(200).json(ret);
});
 
    // Complete
app.put('/api/addClasses', async (req, res, next) => 
{    
    var error = '';

    const {username, class0, class1, class2, class3, class4, class5} = req.body;

    const db = client.db("StudyBuddy");
    db.collection('users').findOneAndUpdate({username:username}, { $set: {
        "classesTaking.0":class0,
        "classesTaking.1":class1,
        "classesTaking.2":class2,
        "classesTaking.3":class3,
        "classesTaking.4":class4,
        "classesTaking.5":class5
    } })

    var ret = {
        error:'' };
    res.status(200).json(ret);
});

// DELETE USER API
// Works Yay! Needs fine tuning.
// Wait until all APIs are complete to implement JWT.
app.delete('/api/deleteUser', async (req, res, next) => 
{
    var error = '';
  
    const {username} = req.body;

    const db = client.db("StudyBuddy");
    db.collection('users').deleteOne({username:username});
  
    var ret = {error:error};
    res.status(200).json(ret);
});

/* GROUPS **************************************************************/
// CREATE GROUP API
// Works, though date/time are only tested with string input.
// Implement JWT.
app.post('/api/createGroup', async (req, res, next) =>
{
    const { groupName, course, description, date, time, location} = req.body;

    const newGroup = {groupName:groupName,course:course,description:description,date:date,time:time,location:location};
    var error = '';
    console.log(newGroup);
    try
    {
        const db = client.db("StudyBuddy");
        const result = db.collection('groups').insertOne(newGroup);
    }
    catch(e)
    {
        error = e.toString();
    }
    
        var ret = { error: error };
        res.status(200).json(ret);
    
});

// SEARCH GROUPS API
 // GET FILTER WORKING
// Wait until all APIs are complete to implement JWT.
app.post('/api/searchGroups', async (req, res, next) => 
{

   // incoming: userId, search
      // outgoing: results[], error
    
      var error = '';
    
      const {search } = req.body;
 
         const db = client.db("StudyBuddy");
      const results = await db.collection('groups').find({groupName:{$regex:search+'.*'}}).toArray(); 

      
      var ret = [];
      
      for( var i=0; i<results.length; i++ )
      {
        ret.push( results[i].groupName );
      }
      
      var ret2 = {results:ret, error:error};
      res.status(200).json(ret2);

});

// EDIT USER API
// Error 404 Not Found.
// Wait until all APIs are complete to implement JWT.
app.put('/api/editGroup', async (req, res, next) => 
{    
    var error = '';

    const {groupName, course, description, dates, time, location} = req.body;

    const db = client.db("StudyBuddy");
    db.collection('groups').findOneAndUpdate({groupName:groupName}, { $set: {
        "course":course,
        "description":description,
        "dates":dates,
        "time":time,
        "location":location
    } })
    
    var ret = {
        groupName:groupName,
        course:course,
        description:description,
        dates:dates,
        time:time,
        location:location,
        error:'' };
    res.status(200).json(ret);
});
    
// Ratings
app.put('/api/editRating', async (req, res, next) => 
{    
     var error = '';

    const {username, groupName, rating} = req.body;

    const db = client.db("StudyBuddy");
    db.collection('groups').updateOne({groupName:groupName}, { $push: {
        "reviews":rating
    } })

    var ret = {
        error:'' };
    res.status(200).json(ret);
});

// DELETE GROUP API
// Works Yay! Needs fine tuning.
// Wait until all APIs are complete to implement JWT.
app.delete('/api/deleteGroup', async (req, res, next) => 
{
    var error = '';
  
    const {groupName} = req.body;

    const db = client.db("StudyBuddy");
    db.collection('groups').deleteOne({groupName:groupName});
  
    var ret = {error:error};
    res.status(200).json(ret);
});
}
