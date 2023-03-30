
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000


connectDB()

const app = express()

app.use(express.json())

/**
 * In Postman, x-www-form-urlencoded is clicked*
 * with Key: test & Value: First User
 * Tested with the POST: Set a User
 * printed in the terminal
 */
app.use(express.urlencoded({ extended: false }))

/**
 * The URL can only be accessed by the '/api/classes'
 */
app.use('/api', require('./backend/routes/classRoutes'))
app.use('/api', require('./backend/routes/userRoutes'))
app.use('/api', require('./backend/routes/groupRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server has started on port ${port}`))
=======
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');           
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use((req, res, next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
    // Set static folder
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => 
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));
  
// LOGIN API
app.post('/api/login', async (req, res, next) => 
{    
    var error = '';
  
    const { login, password } = req.body;

  
    const db = client.db("StudyBuddy");
    const results = await db.collection('Users').find({username:login,password:password}).toArray();
  
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
app.post('/api/register', async (req, res, next) =>
{
    const { firstName, lastName, username, password} = req.body;

    const newUser = {firstName:firstName,lastName:lastName,username:username,password:password};
    var error = '';
    console.log(newUser);
    try
    {
        const db = client.db("StudyBuddy");
        const result = db.collection('Users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

app.listen(PORT, () => 
{
    console.log('Server listening on port ' + PORT);
});
