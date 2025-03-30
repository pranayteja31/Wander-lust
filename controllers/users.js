const User=require("../models/user.js");

module.exports.signupForm=async (req,res,next)=>{
    res.render("./user/signup.ejs");
};

module.exports.signupUser=async (req,res,next)=>{
    try{
        let{username,email,password}=req.body;
        const newuser=new User({email,username});
        let registereduser=await User.register(newuser,password);
        //signup to 
        req.login(registereduser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listing");
        });
        
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/user/signup");
    }
    
};

module.exports.loginForm=async (req,res,next)=>{
    res.render("./user/login.ejs");
};

module.exports.loginUser=(req,res)=>{
    req.flash("success","Welcome back");
    let redirecturl=res.locals.redirecturl || "/listing";
    res.redirect(redirecturl);
};
module.exports.logoutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Logged out successfully!");
        res.redirect("/listing");
    })
};