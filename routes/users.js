const express = require('express');
const router = express.Router();

//Register

router.get('/register', (req, res) => {
    res.send("Register");
});


//Authenticate
router.get('/authenticate', (req, res) => {
    res.send("Authenticate");
});


//profile
router.get('/profile', (req, res) => {
    res.send("Profile");
});

//validate
router.get('/validate', (req, res) => {
    res.send("Validate");
});

module.exports = router;