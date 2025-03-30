const Listing=require("../models/listing.js");
const Review=require("../models/reviews.js");

module.exports.newReview=async(req,res,next)=>{
    let {id}=req.params;
    const user=await Listing.findById(id);
    let revdata= new Review(req.body.review);
    revdata.author=req.user._id; 
    user.review.push(revdata);
    await revdata.save();
    await user.save();
    req.flash("success","New Review is created !");
    res.redirect(`/listing/${id}`);
};

module.exports.destroyReview=async(req,res,next)=>{
    let {id,rid}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:rid}});
    await Review.findByIdAndDelete(rid);
    req.flash("success","Review is Deleted !");
    res.redirect(`/listing/${id}`);

}