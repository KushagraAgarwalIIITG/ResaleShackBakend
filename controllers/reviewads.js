
const ReviewAds = require("../models/reviewads")
const Ad = require("../models/ad")
exports.addToReview = (req, res) => {


    const nAd = new ReviewAds();
    nAd.ad = req.ad;
    console.log(nAd);

    // ReviewAds.find(nAd.ad._id).exec((err, ad) => {
    //     if (ad) {
    //         return res.status(400).json({
    //             message: "Ad already reported"
    //         })
    //     }
    // })

    nAd.save((err, review) => {
        if (err || !review) {
            return res.status(400).json({
                error: " review not saved in the DB"
            })
        }
        res.json(
            (review)
        )
    })

}


exports.getAllReviewAds = (req, res) => {
    ReviewAds.find().populate('ad').exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No ads found"
            })
        }
        res.json(user)
    })
}

exports.deleteFromReview = (req, res) => {
    console.log("inside controller")
    const nAd = new ReviewAds();
    const kush = nAd.rads.pull(req.ad);
    nAd.find().exec((err, review) => {
        if (err || !review) {
            return res.status(400).json({
                error: " review not deleted from in the DB"
            })
        }
        res.json({
            review
        })
    })

}
exports.removeReview = (req, res) => {
    // console.log(req.ad);
    // const rad = req.ad;
    ReviewAds.deleteOne({ ad: req.ad })
        .then((data) => {
            
            if (data) {
                // console.log("this is error",err);
                // console.log("rad",rad);
                return res.status(200).json({
                    message: " review  removed from the db"
                })
            }
            else{
            res.json({
                message: `Not deleted `
            });
        }
        });

}