const User = require("../models/user");
const Ad = require("../models/ad")

exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile= user;
        next();
    })
}

exports.getUser=(req,res)=>{
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile);

}
exports.getUserInfo=(req,res)=>{
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    req.profile.role=undefined;
    req.profile.rollnumber=undefined;
    req.profile.Ads=undefined;

    return res.json(req.profile);

}

exports.getAllUsers=(req,res)=>{
    User.find().exec((err,user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                error: "No users found"
            })
        }
        res.json(user)
    })
}

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err)
            {
                return res.status(400).json(
                    {
                        error:"You are not authorized to update this info"
                    }
                )
            }
            user.salt=undefined;
            user.encry_password=undefined;
            user.createdAt=undefined;
            user.updatedAt=undefined;
            res.json(user);
        }
    )
}

//here we are pulling up all the ads by a given user.
exports.userAdList = (req,res)=>{
    Ad.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,ad)=>{
        if(err){
            return res.status(400).json({
                error: "No ads for the user"
            })
        }
        return res.json(ad)
    })
}

// exports.pushOrderInAdsList=(req,res,next)=>{
//     let ads = [];
//     req.body.ads
    
//     next();
// }