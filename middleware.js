const Listing=require("./models/listing.js");
const ExpressError=require("./utlis/ExpressError");
const {listingSchema}=require("./schema.js");
const {reviewSchema}=require("./schema.js");
const Review=require("./models/reviews.js");

module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirecturl=req.originalUrl;
        req.flash("error","you must be signed in first");
        return res.redirect("/user/login");
    }
    next();
    
};
module.exports.saveredirectUrl=(req,res,next)=>{
    
    if(req.session.redirecturl){
        res.locals.redirecturl=req.session.redirecturl;
    }
    next();
}

module.exports.isowner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error","You are not the owner of this listing !");
        return res.redirect(`/listing/${id}`);
    } 
    next();
}

module.exports.validatelisting=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validatereview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.isrevauthor=async(req,res,next)=>{
    let {id,rid}=req.params;
    let rev=await Review.findById(rid);
    if(!rev.author._id.equals(res.locals.currentUser._id)){
        req.flash("error","You are not the author of this review !");
        return res.redirect(`/listing/${id}`);
    } 
    next();
}


module.exports.editCoordinates=async (req,res,next)=>{
    let id=req.params.id;
    let lst=await Listing.findById(id);
    let location=lst.location;
    if(!lst.geometry.coordinates.length){
        try{
            location = new URLSearchParams({ q: location}).toString();
            let mapurl=`https://geocode.maps.co/search?${location}&api_key=${process.env.MAP_API_KEY}`;
            const response=await fetch(mapurl);
            const data=await response.json();
            let{lat,lon}=data[0];
            lst.geometry.coordinates=[lat,lon];
            console.log("if called");
            await lst.save();
        }catch(e){
            req.flash("error","Couldn't fetch the location !");

        }
        
    }
    next();
}