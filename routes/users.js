const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/keys.js');

const profile = require('../models/Profile');
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
            res.json({ "success": false, msg: 'Failed to register User' })
        } else {
            res.json({ "success": true, msg: "User Added" })
        }
    })
});


//Authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                "success": false,
                msg: "User Not Found"
            })
        } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        username: user.username,
                        name: user.name
                    }
                    const token = jwt.sign(payload, config.secret, { expiresIn: 36000 });
                    return res.json({
                        "success": true,
                        token: 'bearer ' + token,
                        user: {
                            id: user.id,
                            name: user.name,
                            username: user.username
                        }
                    })
                } else {
                    return res.json({
                        "success": false,
                        "msg": "Wrong Password"
                    })
                }
            })
        }
    })

});


//profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        user: req.user,
    })
});

router.post('/makeProfile', (req, res) => {
    let newProfile = new profile({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        user_id: req.body._id,
    })

    console.log("User");
    console.log(newProfile);
    console.log("User");
    //if already exists in database

    profile.findByUserID(newProfile.user_id, (err, user) => {
        if (user) {
            return res.json({
                success: true,
                alreadyPresent: true,
                user_id: user.user_id,
                msg: "User already exists in database"
            })
        } else { //generate new profile in database
            profile.saveProfile(newProfile, (err, user) => {
                if (err) {
                    return res.json({
                        success: false,
                        alreadyPresent: false,
                        msg: "Not able to initialize Profile"
                    })
                } else {
                    console.log('XXX');
                    console.log(user);
                    console.log('XXX');
                    return res.json({
                        success: true,
                        alreadyPresent: false,
                        user_id: user.user_id,
                        msg: "Profile Initialized"
                    })
                }
            })
        }
    })
});



module.exports = router;