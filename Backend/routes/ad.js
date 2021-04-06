const express = require("express");
const router = express.Router();

const {createAd,getAdById,getAd,getImage,getAdByUser,updateAd,removeAd,getAllAds}= require("../controllers/ad");
const {isSignedIn,isAuthenticated}= require("../controllers/auth");
const {getUserById}= require("../controllers/user");

//all params
router.param("userId",getUserById);
router.param("adId",getAdById);
//all routes
router.post("/ad/create/:userId",isSignedIn,isAuthenticated,createAd);
router.get("/ad/:adId",getAd);
router.get("/ad/image/:adId",getImage);
router.get("/ad/:userId",isSignedIn,isAuthenticated,getAdByUser);
router.get("/ad/:categoryId",getAdByUser);

router.put("/ad/:adId/:userId",isSignedIn,isAuthenticated,updateAd);

router.delete("/ad/:adId/:userId",isSignedIn,isAuthenticated,removeAd);

//listing route
router.get("/ads",getAllAds);


module.exports = router;