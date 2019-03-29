const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const config = require('../config/keys.js');


router.post('/edit_profile', (req, res) => {
    let updateProfile = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        gender: req.body.gender,
        bio: req.body.bio,
        user_id: req.body.user_id
    };

    console.log("Profile");
    console.log(updateProfile);
    console.log("Profile");

    Profile.updateP(updateProfile, (err, user) => {
        if (err) throw err;
        else {
            console.log("Update User");
            console.log(user);
            res.json({
                user: user
            })
        }
    })
})






module.exports = router;