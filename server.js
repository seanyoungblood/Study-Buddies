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

var api = require('./api.js');
api.setApp( app, client );

app.listen(PORT, () => 
{
    console.log('Server listening on port ' + PORT);
});

