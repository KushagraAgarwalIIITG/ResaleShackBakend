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
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMes(user) {
 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
     secure: false, // true for 465, false for other ports
    service :'gmail',
    auth: {
      user: 'kushagrakinayiid@gmail.com', // generated ethereal user
      pass: 'btechcse@1', // generated ethereal password
    }
  });
 // const {name,email}=user;
 // const token = jwt.sign({_id: user._id},process.env.SECRET); 
  const token = jwt.sign({user},process.env.SECRET); 
  const mailOptions = {
    from: 'kushagrakinayiid@gmail.com', // sender address
    to: user?.email, // list of receivers
    subject: 'Verification Email' , // Subject line
    //text: "Hello world?", // plain text body
    html: `<b>Click on this link to verify your ResaleShack Account</b>
    <p>${process.env.CLIENT_API}/api/authentication/activate/${token}`, // html body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      return ({message : "Email has been sent see your institute mail"})
 });

}

sendMes().catch(console.error);

exports.signup= async function(req, res)
{
    
    console.log("signup backend")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const user = new User(req.body);
    // sendMes(req.body);
     const messageStatus= await sendMes(req.body);
     console.log(messageStatus)
    return res.json({message : "Email has been sent see your institute mail"});
    
    // user.save((err,user)=>{
    //     if(err)
    //     {
    //         return res.status(400).json({
    //             err : "Not able to save the user successfully"
    //         });
    //     }
    //     res.json(user);
    // })
    // console.log("REQUEST BODY", req.body)
    // //only one thing works in the function either json or send
    // res.json({
    //     "name": "Kushagra"
    // });
    
    
}
exports.getToken = (req,res,next,token)=>{
    res.setHeader("Content-Type", "application/json");
        console.log(token);
        req.profile= token;
        next();
    
}
exports.activateAccount=(req,res)=>{
    const token = req.profile;
    console.log(token)
    if(token){
        jwt.verify(token,process.env.SECRET,function(err,decodedToken){
            if(err)
            {
                return res.status(400).json({error:"Link Incorrect"})
            }
            const {user}= decodedToken;
           // console.log(user);
         
         
         
            const newUser = new User(user);
             newUser.save((err,user)=>{
        if(err)
        {
            return res.status(400).json({
                err : "Not able to save the user successfully"
            });
        }
       return res.json("You are verified");
    })
    
        })
    }else{
        return res.json({error:"something went wrong"})
    }
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