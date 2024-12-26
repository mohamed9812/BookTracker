const mongoose = require('mongoose');

const UserTokenSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        token: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 1800
        }
    }
);

module.exports = mongoose.model('BookTracker_UserTokens', UserTokenSchema);