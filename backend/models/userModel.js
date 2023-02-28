const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        "email": {type: String, unique: true, required: true},
        "firstname": {type: String, required: true},
        "lastname": {type: String, required: true},
        "password": {type: String, required: true},
        "gender": {type: String, required: true},
        "contact": {type: String, required: true},
        "age": {type: String, required: true},
        "joinedAt": {type: Date, default: Date.now()}
    }
)

module.exports = mongoose.model('user', userSchema);