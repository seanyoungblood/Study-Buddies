const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');

connectDB()

const app = express()

app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
/**
 * In Postman, x-www-form-urlencoded is clicked*
 * with Key: test & Value: First User
 * Tested with the POST: Set a User
 * printed in the terminal
 */
app.use(express.urlencoded({ extended: false }))


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

/**
 * The URL can only be accessed by the '/api/classes'
 */
app.use('/api', require('./routes/classRoutes'))
app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/groupRoutes'))

// Serve frontend
/*
    ALERT CHANGE path.join() TO THE CORRECT PATHING FOR LARGE PROJECT
*/
if (process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    ))
} else{
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server has started on port ${port}`))
