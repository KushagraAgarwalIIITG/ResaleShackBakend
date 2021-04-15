const express = require("express");
const router = express.Router();

const {createAd,getAdById,getAd,getImage,getAdByUser,updateAd,removeAd,getAllAds}= require("../controllers/ad");
const {isSignedIn,isAuthenticated}= require("../controllers/auth");
const {getUserById}= require("../controllers/user");
const {addToReview,getAllReviewAds, removeReview} = require("../controllers/reviewads")
//all params
router.param("userId",getUserById);
router.param("adId",getAdById);
//all routes
router.post("/reviewad/add/:adId",addToReview);
router.get("/reviewads/:userId",isSignedIn, isAuthenticated,getAllReviewAds)
router.delete("/reviewad/delete/:adId/:userId",isSignedIn,isAuthenticated,removeReview);

module.exports = router;