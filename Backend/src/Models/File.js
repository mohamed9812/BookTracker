const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data: { 
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('File', FileSchema);