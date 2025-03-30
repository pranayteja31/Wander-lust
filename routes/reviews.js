const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync= require("../utlis/wrapAsync");
const reviewController=require("../controllers/review.js");

const {validatereview,isloggedin,isrevauthor}=require("../middleware.js");

//new review
router.post("/",validatereview,isloggedin,wrapAsync(reviewController.newReview));

//delete review
router.delete("/:rid",isloggedin,isrevauthor,wrapAsync(reviewController.destroyReview));
module.exports=router;