const Ad= require('../models/ad');

const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getAdById = (req,res,next,id)=>{
   // console.log("geadbyid")
    Ad.findById(id)
    .populate("category")
    .exec((err,ad)=>{
        if(err)
        {
            return res.status(400).json({
                error: "ad not found"
            })
        }
        req.ad=ad;
        next();
    })
}

exports.createAd=(req,res)=>{
   let form = new formidable.IncomingForm();
   form.keepExtensions= true;
   form.parse(req, (err,fields,file)=>{
       if(err)
       {
           res.status(400).json({
               error:"Problem with image"
           });
       }
    
       //destructuring the fields
       const {title,description,price, category} = fields;

       if(
           !title||
           !description||
           !price || !category
            )
       {
           return res.status(400).json(
               {
                   error:"Please include all required fields"
               }
           )
       }
      
       let ad= new Ad(fields);
      // console.log("created ad with fields");
       //handling files
       if(file.image){
           if(file.image.size>3000000)
           {
               return res.status(400).json(
                   {
                       error: "file size too big"
                   }
               );
           }
           ad.image.data = fs.readFileSync(file.image.path);
           ad.image.contentType = file.image.type;
        }
           ad.save((err,ad)=>{
            if(err || !ad)
            {
                return res.status(400).json({
                    error: " ad not saved in the DB"
                });
            }
           res.json({ ad });
        })    
       
   })
}
exports.getAd =(req,res)=>{
    req.ad.image="";
    return res.json(req.ad);
}
//middleware
exports.getImage=(req,res,next)=>{
    if(req.ad.image.data){
        res.set("Content-Type",req.ad.image.contentType);
        return res.send(req.ad.image.data);
    }
    next();
}
///route

exports.getAdByUser=(req,res)=>{
    //console.log(req.profile._id);
    Ad.find({user:req.profile._id}).exec((err,ad)=>{
        if(err || !ad)
        {
            return res.status(400).json({
                error: " ad not in the DB"
            })
        }
        res.json(ad);
    })    
}

exports.updateAd=(req,res)=>{
    let form = new formidable.IncomingForm();
   form.keepExtensions= true;
   form.parse(req, (err,fields,file)=>{
       if(err)
       {
           res.status(400).json({
               error:"Problem with image"
           });
       } 
       let ad= req.ad;
       ad=_.extend(ad,fields);
     //  console.log(ad);
       //handling files
       if(file.image){
           if(file.image.size>3000000)
           {
               return res.status(400).json(
                   {
                       error: "file size too big"
                   }
               )
           }
         //  console.log("ad about to be saved");
           ad.image.data = fs.readFileSync(file.image.path);
           ad.image.contentType = file.image.type;
        }
      //     console.log("ad about to be saved");
           ad.save((err,ad)=>{
            if(err || !ad)
            {
                return res.status(400).json({
                    error: " ad not updated in the DB"
                });
            }
           res.json({
              ad})
        });    
       });
    }
    
   
    

exports.removeAd=(req,res)=>{
    const ad = req.ad;
    ad.remove((err,delAd)=>{
        if(err){
            return res.status(400).json({
                error:"failed to delete the ad"
            })
        }
        res.json(
            {
                message: "the ad got deleted",
                delAd
            }
        )
    })
}
exports.getAllAds=(req,res)=>{
    let limit = req.query.limit? parseInt(req.query.limit) : 12;
    let sortBy = req.query.sortBy? req.query.sortBy : "_id";
    let direction=req.query.direction?req.query.direction:"asc";
    Ad.find()
    .select("-image")
    .populate("category")
    .sort([[sortBy,direction]])
    .limit(limit)
    .exec((err,ads)=>{
        if(err)
        {
            return res.status(400).json({error:"no ads in DB"})
        }
        res.json(ads);
    })

}

exports.getAdByCategory=(req,res)=>{
    //console.log(req.profile._id);
    Ad.find({category:req.profile._id}).populate("category").exec((err,ad)=>{
        if(err || !ad)
        {
            return res.status(400).json({
                error: " ad not in the DB"
            })
        }
        res.json(ad);
    })    
}