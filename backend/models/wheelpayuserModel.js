const mongoose = require('mongoose')

const wheelpayuserSchema = new mongoose.Schema(
    {
        "email": {type: String, unique: true, required: true},
        "firstname": {type: String, required: true},
        "lastname": {type: String, required: true},
        "password": {type: String, required: true},
        "vehiclenumber": {type: String, required: true},
        "contact": {type: String, required: true},
    }
)

module.exports = mongoose.model('wheelpayuser', wheelpayuserSchema);