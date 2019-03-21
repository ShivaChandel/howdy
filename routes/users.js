const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//Register

router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register User' })
        } else {
            res.json({ success: true, msg: "User Added" })
        }
    })
});


//Authenticate
router.get('/authenticate', (req, res) => {
    res.send("Authenticate");
});


//profile
router.get('/profile', (req, res) => {
    res.send("Profile");
});



module.exports = router;