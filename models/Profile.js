const mongoose = require('mongoose');


const schema = mongoose.Schema;

const profileSchema = schema({
    name: {
        type: String
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    gender: {
        type: String
    },
    user_id: {
        type: String
    }

});

const Profile = module.exports = mongoose.model('Profile', profileSchema);

module.exports.saveProfile = (user, callback) => {
    user.save(callback);
}

module.exports.findByUserID = (id, callback) => {
    let query = { user_id: id };
    Profile.findOne(query, callback);
}