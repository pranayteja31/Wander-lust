if(process.env.NODE_ENV!=="production"){
    require("dotenv").config();
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");

const path=require("path");
const methodOverride=require("method-override");
const engine = require('ejs-mate');
const wrapAsync= require("./utlis/wrapAsync");
const ExpressError=require("./utlis/ExpressError");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const users=require("./routes/user.js");


const listing=require("./routes/listing.js");
const reviews=require("./routes/reviews.js");



app.engine('ejs', engine);
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const mongoUrl= process.env.MONGODB;

const store = MongoStore.create({
    mongoUrl: mongoUrl,
    crypto: {
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600 // time period in seconds
});
store.on("error",()=>{
    console.log("session store error",err);
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()*7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httOnly:true
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//root route

app.use((req,res,next)=>{
    res.locals.success =req.flash("success");
    res.locals.error =req.flash("error");
    res.locals.currentUser=req.user;
    next();
});

app.use("/listing",listing);
app.use("/listing/:id/review",reviews);
app.use("/user",users);




app.listen(8080,()=>{
    console.log("app listening on 8080");
});

app.get("/",wrapAsync( async (req,res,next)=>{
    res.send("this is home");
}));




//demo user


main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl);
};
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found"));
});


app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    // res.status(statusCode).send(message);
    res.render("./listing/error.ejs",{message});
});


