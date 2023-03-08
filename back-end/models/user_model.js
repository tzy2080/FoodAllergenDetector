const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

const User = mongoose.model('User', userSchema);

module.exports = { User };