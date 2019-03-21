const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/keys.js');

const schema = mongoose.Schema;

const userSchema = schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    let query = { username: username };
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.log(err);
        } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    newUser.password = hash;
                    newUser.save(callback);
                }
            })
        }
    })
}