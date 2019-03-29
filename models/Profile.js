const mongoose = require('mongoose');


const schema = mongoose.Schema;

const profileSchema = schema({
    user_id: {
        type: String
    },
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
    bio: {
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

module.exports.updateP = (updateProfile, callback) => {

    let query = { user_id: updateProfile.user_id };
    let response = updateProfile;
    console.log("Query");
    console.log(query);
    console.log("Query");
    Profile.findOneAndUpdate(query, { $set: response }, { new: true }, (err, user) => {
        if (err) throw err;
        if (user) {
            console.log(user);
            callback(null, user);
        } else {
            console.log("No Updated");
            callback(null, { user: null });
        }
    });
}