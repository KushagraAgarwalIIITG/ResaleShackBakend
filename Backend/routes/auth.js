const e = require('express');
var express = require('express')
var router = express.Router()
var {isAdmin,signup,signin,signout,isSignedIn} = require('../controllers/auth')
const { check } = require('express-validator');

// define the home page route

router.post('/signup',[
check('email',"Only institute emails required").custom(value=>{
    if(value.match(/@iiitg.ac.in$/))
    return true;
    else
    throw new Error("Only institute emails required");
}),check("password","password is required").custom(value=>{
    if(value.length>3)
    return true;
    else
    throw new Error("password required");
})],

signup)


router.post('/signin',[
check('email',"Only institute emails required").custom(value=>{
    if(value.match(/@iiitg.ac.in$/))
    return true;
    else
    throw new Error("Only institute emails required");
}),
check("password","password is required").isLength({min: 3})],
signin)
// define the about route


router.get("/signout",signout);


router.get("/testroute",isSignedIn,(req,res)=>{
    res.json(
        req.auth
    );
});
module.exports = router;