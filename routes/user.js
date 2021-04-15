const express= require("express");
const router = express.Router();

const {getUserById, getUser,getAllUsers,updateUser,userAdList,getUserInfo} = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");


router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn, isAuthenticated,getUser);
router.get("/info/:userId",getUserInfo);

// router.get("/users",getAllUsers)
router.put("/user/:userId",isSignedIn, isAuthenticated,updateUser);
router.get("/ads/user/:userId",isSignedIn, isAuthenticated,userAdList);
module.exports = router;