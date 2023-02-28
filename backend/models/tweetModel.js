const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema(
    {
        "userid": {type: mongoose.Types.ObjectId, required: true},
        "tweetmessage": {type: String, required: true},
        "createdDate": {type: Date, default: Date.now()}
    }
)

module.exports = mongoose.model('tweet', tweetSchema);