const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/keys.js');
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



module.exports = router;