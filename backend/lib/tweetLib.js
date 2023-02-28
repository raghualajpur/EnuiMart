const tweetModel = require('../models/tweetModel');
const userModel = require('../models/userModel');

module.exports.getAllTweetsbyId = async function(id){
    return await tweetModel.find({userid:id});
}

module.exports.getAllTweets = async function(){
    return await tweetModel.find();
}

module.exports.createTweet = async function(Tweet){
    if (!Tweet) {
        throw new Error('Tweet object cannot be null');
    }

    const validUser = await userModel.findOne({id: Tweet.id});
    if (!validUser) {
        throw new Error('Access Denied');
    }

    const user = new tweetModel(Tweet);
    await user.save();
}

module.exports.deleteTweet = async function(Tweet){
    if (!Tweet) {
        throw new Error('Tweet object cannot be null');
    }

    const ValidTweet = await tweetModel.findOneAndRemove({_id: Tweet.id, userid: Tweet.userid});
    if (!ValidTweet) {
        throw new Error('Tweet does not exists');
    }
}

