const User = require('../models/user')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.isAdmin=function(req,res,next){
        if(req.profile.role===0)
        {
            return res.status(403).json({
                error: "You are not ADMIN, Access denied"
            });
        }
        next();
}

exports.signup= function(req, res)
{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err)
        {
            return res.status(400).json({
                err : "Not able to save the user successfully"
            });
        }
        res.json(user);
    })
    // console.log("REQUEST BODY", req.body)
    // //only one thing works in the function either json or send
    // res.json({
    //     "name": "Kushagra"
    // });
    
    
}

exports.signin= function(req,res){
    const { email, password}= req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
           return res.status(400).json({
                error : "User email doesnt exist"
            })
        }
        if(!user.authenticate(password)){
           return res.status(401).json({
               error : "Email and Password dont match"
           }) 
        }
        //create token
        const token = jwt.sign({_id: user._id},process.env.SECRET);
        //put the token in the cookie
        res.cookie("token",token,{expire: new Date()+9999});
        //send response to the frontend
        const{_id,name,email,role}=user;
        return res.json({token,user:{_id,name,email,role}});
    })

}

exports.signout=function(req,res){
    res.clearCookie("token");
    res.json({
        message : "User Sign out successfully"
    });

}

//protected routes

exports.isSignedIn= expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty:"auth"
});


//CUSTOM MIDDLEWARES
exports.isAuthenticated =( req, res, next) =>{
    let checker= req.profile && req.auth && req.profile._id==req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "access denied"
        })
    }
    next();
}

exports.isAdmin =( req, res, next) =>{
    if(req.profile.role===0)
    {
        return res.status(403).json({
            error:"You are not admin"
        });
    }
    next();
}