const userModel = require('../models/wheelpayuserModel');

module.exports.getAllUsers = async function(){
    return await userModel.find({});
}

module.exports.createUser = async function(User){
    if (!User) {
        throw new Error('User object cannot be null');
    }

    const existingUser = await userModel.findOne({email: User.email});
    if (existingUser) {
        throw new Error('User already exists');
    }

    const user = new userModel(User);
    await user.save();
}
