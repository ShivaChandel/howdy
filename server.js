const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const db = require('./config/keys').database;

const app = express();
const PORT = process.env.PORT || 8080;

//use
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to database
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Database')
    }, (err) => {
        console.log(err)
    })
    .catch(err => console.log(err));


//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


//use static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
const users = require('./routes/users');

const profile = require('./routes/profiles');


app.use('/profile', profile);
app.use('/users', users);


app.get('/', (req, res) => {
    res.send('Invalid EndPoint');
})

app.listen(PORT, (req, res) => {
    console.log(`Express running on port ${PORT}`);
})