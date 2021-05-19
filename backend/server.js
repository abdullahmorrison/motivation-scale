const express = require('express');
const app = express();
const mongoose = require('mongoose');//connect to db
const bodyParser = require('body-parser')
const Scale = require('./models/scale');
const User = require('./models/user');

require('dotenv/config')//security (dotenv)

app.use(bodyParser.json({ limit: '30mb', extended: true }))

const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client('212338543657-jov7gtn2u61p4bst88inr3v4sneda77t.apps.googleusercontent.com')

const jwt = require('jsonwebtoken');

//cors = cross-origin resource sharing
const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}))

app.get('/api/scales', async (req, res)=>{ //retrieving data
    try {
        const postMessages = await Scale.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.get('/api/scales/:scaleID', async (req, res)=>{ //retrieving data
    try {
        const scale_by_ID = await Scale.findById(req.params.scaleID);
        res.status(200).json(scale_by_ID);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.post('/api/scales', async (req, res)=>{ //adding data
    const scale = new Scale({
        username: req.body.username,
        title: "",
        explanation: "",
        futurePlan: ""
    })
    try {
        const savedScale = await scale.save();
        console.log(savedScale)
        res.status(201).json(savedScale);
    } catch (error) {
        res.status(409).json({ message: error.message });
    } 
})

app.patch('/api/scales/title/:scaleID', async (req, res)=>{//updating title
    try{
        const updatedScale = await Scale.updateOne(
            {_id: req.params.scaleID},
            {$set: {title: req.body.title}}
        )
        res.json(updatedScale)
    }catch(err){
        res.json({message: err})
    }
})

app.patch('/api/scales/sliderValue/:scaleID', async (req, res)=>{//updating slider value
    try{
        const updatedScale = await Scale.updateOne(
            {_id: req.params.scaleID},
            {$set: {sliderValue: req.body.sliderValue}}
        )
        res.json(updatedScale)
    }catch(err){
        res.json({message: err})
    }
})

app.patch('/api/scales/explanation/:scaleID', async (req, res)=>{//updating explantion
    try{
        const updatedScale = await Scale.updateOne(
            {_id: req.params.scaleID},
            {$set: {explanation: req.body.explanation}}
        )
        res.json(updatedScale)
    }catch(err){
        res.json({message: err})
    }
})

app.patch('/api/scales/futurePlan/:scaleID', async (req, res)=>{//updating futurePlan
    try{
        const updatedScale = await Scale.updateOne(
            {_id: req.params.scaleID},
            {$set: {futurePlan: req.body.futurePlan}}
        )
        res.json(updatedScale)
    }catch(err){
        res.json({message: err})
    }
})

app.delete('/api/scales/:scaleID', async (req, res)=>{//deleting data
    try{
        const removedScale = await Scale.deleteOne({_id: req.params.scaleID})
        res.json(removedScale)
    }catch(err){
        res.json({message: err})
    }
})

//*USER ROUTES
app.get('/api/users', async (req, res)=>{ //retrieving data
    try {
        const postMessages = await User.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.post('/api/users', async (req, res)=>{ //adding data
    const username = req.body.username;
    
    const newUser = new User({username});
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    } 
})

app.post('/api/googlelogin', async (req, res)=>{ //adding data
    console.log("***************ENTERED**************")
    const tokenId = req.body.tokenId;
    client.verifyIdToken({idToken: tokenId, audience: '212338543657-jov7gtn2u61p4bst88inr3v4sneda77t.apps.googleusercontent.com'})
        .then(response =>{
            const {email_verified, name, email} = response.payload
            if(email_verified){
                console.log("verified email")
                User.findOne({username: email}).exec((err, user)=>{
                    if(err){
                        return res.status(400).json({
                            error: "error"
                        })
                    }else{
                        if(user){//user already exists
                            console.log("user exists: ",user._id)
                            const token = jwt.sign({_id: user._id}, "mysigninkeytest")
                            const {_id, username} = user;
                            

                            res.json({
                                token,
                                user: {_id, username}
                            })
                        }else{//create new user
                            console.log("create new user")
                            const newUser = new User({username: email})
                            newUser.save((err, data)=>{
                                if(err){
                                    console.log("error: ",err.message)
                                    return res.status(400).json({
                                        error: "somthing went wrong"
                                    })
                                }
                                const token = jwt.sign({_id: data._id}, "mysigninkeytest")
                                const {_id, username: email} = newUser;

                                console.log("token: ",token)
                                console.log(newUser)

                                console.log(res.json({
                                    token,
                                    user: {_id, username: email}
                                }))
                            })
                        }
                    }
                })
            }
        })
})
const port = process.env.PORT || 3001;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{app.listen(port, ()=>console.log(`Server started on port ${port}`))})
    .catch((error)=> console.log(error.message))
    
mongoose.set('useFindAndModify', false)