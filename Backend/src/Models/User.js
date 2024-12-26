const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    genres: {
        type: Array,
        required: false
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('BookTracker_Users', UserSchema);