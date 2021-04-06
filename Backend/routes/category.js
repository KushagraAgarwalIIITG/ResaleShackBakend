const express= require("express");
const router = express.Router();

const {getCategoryById,createCategory,getCategory,getCategories,updateCategory,removeCategory,getCategoryId}= require("../controllers/category");
const {isSignedIn,isAuthenticated,isAdmin}= require("../controllers/auth");
const {getUserById}= require("../controllers/user");
const { getAdByCategory } = require("../controllers/ad");
//const {getCategoryById}= require("../controllers/category")
//params
router.param("userId",getUserById);//this populates the req.profile
router.param("categoryId",getCategoryId);

//actual routes
//create routes
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);
//read routes
router.get("/category/:categoryId",getAdByCategory);
router.get("/categories",getCategories);
//update routes
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory);
module.exports = router;