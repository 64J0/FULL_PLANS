const { Schema } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: data,
        default: data.now,
    },
});

module.exports = mongoose.model('User', UserSchema); 