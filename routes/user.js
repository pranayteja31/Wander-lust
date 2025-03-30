const express=require("express");
const router=express.Router();
const wrapAsync= require("../utlis/wrapAsync");
const passport=require("passport");
const {saveredirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js");



//signup route
router.route("/signup")
.get(wrapAsync(userController.signupForm))
.post(wrapAsync(userController.signupUser));

//login route

router.route("/login")
.get(wrapAsync(userController.loginForm))
.post(saveredirectUrl,passport.authenticate("local",{
    failureFlash:true,
    failureRedirect:"/user/login"
}),userController.loginUser);

//logout
router.get("/logout",userController.logoutUser);

module.exports=router;