const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv =  require("dotenv");
dotenv.config()

const userModel = require('./backend/models/userModel');

const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json());

const userLib = require('./backend/lib/userLib');
const tweetLib = require('./backend/lib/tweetLib');

app.get("/", function(req, res) {
    res.send("Welcome to Wheel Pay");
})

mongoose.set("strictQuery", true)
mongoose.connect(process.env.MONGO_CONNECTION_STRING, async function(err){
    if(err) {
        console.error("Error")
    }
    else{
        console.log("Database connected");
        app.listen(3001, function () {
            console.log("Server listening on port http://localhost:3001/")
        });
    }
})

app.post('/api/createNewUser', async (req, res) => {
    try {
        await userLib.createUser(req.body);
        res.send("Registered successfully");
    } catch (error) {
        res.status(500).send("Failed to register: " + error.message);
    }
});

app.post('/api/ValidateUser', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await userModel.findOne({email: email});

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
        
        if(user.password === password){
            userdata = {
                "email": user.email,
            }
            
            res.send({user: userdata, status: "Logged In Successfully"});
        }
        else{
            return res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        res.status(500).send("Failed to sign in: " + error.message);
    }


});

app.post('/api/createTweet', async (req, res) => {
    try {
        await tweetLib.createTweet(req.body);
        res.send("Tweet created successfully");
    } catch (error) {
        res.status(500).send("Failed to create Tweet: " + error.message);
    }
});

app.get('/api/getallTweets', async (req, res) => {
    try {
        const tweets = await tweetLib.getAllTweets();
        res.send(tweets);
    } catch (error) {
        res.status(500).send("Failed to Fetch Tweets: " + error.message);
    }
});

app.post('/api/getallTweetsbyId', async (req, res) => {
    try {
        const tweets = await tweetLib.getAllTweetsbyId(req.body.userid);
        res.send(tweets);
    } catch (error) {
        res.status(500).send("Failed to Fetch Tweets: " + error.message);
    }
});

app.post('/api/deleteTweet', async (req, res) => {
    try {
        await tweetLib.deleteTweet(req.body);
        res.send("Tweet Deleted Successfully");
    } catch (error) {
        res.status(500).send("Failed to Delete Tweet: " + error.message);
    }
});