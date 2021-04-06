
const ReviewAds = require("../models/reviewads")
const  Ad = require( "../models/ad")
exports.addToReview = (req,res)=>{
    
  
    const nAd = new ReviewAds();
    nAd.ad=req.ad;
    console.log(nAd);
    
    nAd.save((err,review)=>{
        if(err || !review)
        {
            return res.status(400).json({
                error: " review not saved in the DB"
            })
        }
       res.json(
        (review)
       )
    })    
   
}


exports.getAllReviewAds = (req,res)=>{
    ReviewAds.find().populate('ad').exec((err,user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                error: "No ads found"
            })
        }
        res.json(user)
    }) 
}

exports.deleteFromReview = (req,res)=>{
    console.log("inside controller")
    const nAd = new ReviewAds();
    const kush= nAd.rads.pull(req.ad);
    nAd.find().exec ((err,review)=>{
        if(err || !review)
        {
            return res.status(400).json({
                error: " review not deleted from in the DB"
            })
        }
       res.json({
           review
       })
    })    
   
}
exports.removeReview =( req,res)=>{
   // console.log(req.ad);
   // const rad = req.ad;
    ReviewAds.deleteOne({ad:req.ad})
    .then((err,rad)=>{
        
        if(err){
            return res.status(400).json({
                error: " review not removed from the db"
            })
        }
        res.json({
            message: "Successfully deleted"
        });
    });
   
}