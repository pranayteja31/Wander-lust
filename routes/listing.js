const express =require("express");
const router=express.Router();
const wrapAsync= require("../utlis/wrapAsync");
const {isloggedin,isowner,validatelisting,editCoordinates}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({storage});

//index and add new listing
router.route("/")
.get(wrapAsync(listingController.indexRoute))
.post(upload.single("list[image][url]"),validatelisting,wrapAsync(listingController.addListing));

//searching
router.get("/search",wrapAsync(listingController.searchListing));
//new listing form
router.get("/new",isloggedin,wrapAsync(listingController.newListingForm));

//show and delete listing
router.route("/:id")
.get(editCoordinates,wrapAsync(listingController.showListing))
.delete(isloggedin,isowner,wrapAsync(listingController.destroylisting));

//edit listing form and update
router.route("/:id/edit")
.get(isloggedin,isowner,wrapAsync(listingController.editRouteForm))
.patch(upload.single("list[image][url]"),validatelisting,isowner,wrapAsync(listingController.updateChangesListing));

//filters
router.get("/filter/:filter",wrapAsync(listingController.filterlisting))

module.exports=router;
