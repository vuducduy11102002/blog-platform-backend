const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    // password: { type: String, required: true }, // For future authentication
    // Add more fields like email, bio, etc., as needed
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);