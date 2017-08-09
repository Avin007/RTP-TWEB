const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const Upload = require('upload-file');

//Connect to Database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected',()=>{
 console.log('Connected to database '+config.database);
});

//On error
mongoose.connection.on('error',(err)=>{
 console.log('database error:  '+err);
});

const app = express();
const users = require('./routes/users');
const deploiements = require('./routes/deploiements');
//const port = 3000;
const port = process.env.PORT || 8080;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//BodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
app.use('/deploiements',deploiements);

//Index Route
app.get('/', (req,res)=>{
    res.send('Invalid Endpoint, please verify database, auth.service, app.js, and run ng build');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

//Start Server
app.listen(port,() => {
    console.log('Server started on ' +port);
});
