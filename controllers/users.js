require('express');
require('mongoose');//connect to db

const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client('212338543657-jov7gtn2u61p4bst88inr3v4sneda77t.apps.googleusercontent.com')

const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

exports.googleLogin = async (req, res) => {
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
}