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

// SEARCH USER API
// Connection is fine, 200 OK; however, [array[0]] is returned regardless of input.
// Wait until all APIs are complete to implement JWT.
    /*
app.post('/api/searchUsers', async (req, res, next) => 
{
    var error = '';
  
    const { search } = req.body;
    var _search = search.trim();
    var _ret = [];

    const db = client.db("StudyBuddy");
    const results = await db.collection('users').find({ "username": search }).toArray();
    

    for (var i = 0; i < results.length; i++)
    {
        _ret.push( results[i].firstName );
    }
  
    var ret = { results:_ret, error:''};
    res.status(200).json(ret);
});
*/
// EDIT USER API
// Error 404 Not Found.
// Wait until all APIs are complete to implement JWT.
app.put('/api/editUser', async (req, res, next) => 
{    
    var error = '';
    
    const {firstName, lastName, username, password, phone, email, major, classesTaking, likes} = req.body;

    const db = client.db("StudyBuddy");
    const results = await db.collection('users').updateOne({
        firstName:firstName,
        lastName:lastName,
        username:username,
        password:password,
        phone:phone,
        email:email,
        major:major,
        classesTaking:classesTaking,
        likes:likes
    })

    var ret = {
        firstName:firstName,
        lastName:lastName,
        username:username,
        password:password,
        phone:phone,
        email:email,
        major:major,
        classesTaking:classesTaking,
        likes:likes,
        error:'' };
    res.status(200).json(ret);
});

// DELETE USER API
// Error 404 Not Found.
// input should be changed to email to make it easier on front end.
// Wait until all APIs are complete to implement JWT.
app.delete('/api/deleteUser', async (req, res, next) => 
{
    var error = '';
  
    const {username} = req.body;

    const db = client.db("StudyBuddy");
    const results = await db.collection('users').find({"users.username":username}).toArray();
  
    var ret = {error:''};
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
// Connection is fine, 200 OK; however, [array[0]] is returned regardless of input.
// Wait until all APIs are complete to implement JWT.
app.post('/api/searchGroups', async (req, res, next) => 
{
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
});

// EDIT USER API
// Error 404 Not Found.
// Wait until all APIs are complete to implement JWT.
app.put('/api/editGroup', async (req, res, next) => 
{    
    var error = '';
    
    const {groupName, course, description, date, time, location} = req.body;

    const db = client.db("StudyBuddy");
    const results = await db.collection('users').updateOne({
        groupName:groupName,
        course:course,
        description:description,
        date:date,
        time:time,
        location:location,
    })

    var ret = {
        groupName:groupName,
        course:course,
        description:description,
        date:date,
        time:time,
        location:location,
        error:'' };
    res.status(200).json(ret);
});

// DELETE GROUP API
// Error 404 Not Found.
// input should be changed to something other than groupId to make it easier on front end.
// Wait until all APIs are complete to implement JWT.
app.delete('/api/deleteGroup', async (req, res, next) => 
{
    var error = '';
  
    const {groupId} = req.body;

    const db = client.db("StudyBuddy");
    const results = await db.collection('groups').find({groupId:groupId}).toArray();
  
    var ret = {error:''};
    res.status(200).json(ret);
});
}
