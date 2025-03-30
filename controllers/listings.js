const Listing=require("../models/listing.js");

const generateCoordinates=async (newListing)=>{

}

module.exports.indexRoute= async (req,res,next)=>{
    const data= await Listing.find();
    res.render("./listing/index.ejs",{data});
};

module.exports.newListingForm=async (req,res,next)=>{
    res.render("./listing/new.ejs");
};

module.exports.addListing=async (req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.list);
    newListing.owner=req.user._id;
    newListing.image={url,filename}
    let location=newListing.location;
    location = new URLSearchParams({ q: location}).toString();
    let mapurl=`https://geocode.maps.co/search?${location}&api_key=67d3dbc2b782e026531162nzi3ceb66`;
    const response=await fetch(mapurl);
    const data=await response.json();
    let{lat,lon}=data[0];
    newListing.geometry.coordinates=[lat,lon];
    let saved=await newListing.save();
    req.flash("success","New Listing is created !");
    res.redirect("/listing");
};

module.exports.showListing=async (req,res,next)=>{
    let {id}=req.params;
    const lstdata=await Listing.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
    let coord=lstdata.geometry.coordinates;
    if(!lstdata){
        req.flash("error","Listing not found !");
        res.redirect("/listing");
    }
    else{
        res.render("./listing/show.ejs",{lstdata,coord});
    }
    

};

module.exports.editRouteForm=async (req,res,next)=>{
    let {id}=req.params;
    const lstdata=await Listing.findById(id);
    if(!lstdata){
        req.flash("error","Listing not found !");
        res.redirect("/listing");
    }
    let orgimgUrl=lstdata.image.url;
    orgimgUrl=orgimgUrl.replace("/upload","/upload/w_250");
    res.render("./listing/edit.ejs",{lstdata,orgimgUrl});
};

module.exports.updateChangesListing=async (req,res,next)=>{
    let {id}=req.params;
    const updatedListing= await Listing.findByIdAndUpdate(id,{...req.body.list});
    console.log(updatedListing);
    if(req.file){
        let url=req.file.path;
        let filename=req.file.filename;
        updatedListing.image={url,filename}
        await updatedListing.save();
    }
    req.flash("success","The Listing has been updated Successfully !");
    res.redirect(`/listing/${id}`);
};

module.exports.destroylisting=async (req,res,next)=>{
    let {id}=req.params;;
    await Listing.findByIdAndDelete(id);
    req.flash("success","The Listing has been deleted !");
    res.redirect("/listing");
};

module.exports.searchListing= async (req,res,next)=>{
    let {q}=req.query;
    let data= await Listing.find({"title":{$regex:q}});
    res.render("./listing/index.ejs",{data});
}
module.exports.filterlisting=async(req,res)=>{
    let {filter}=req.params;
    if(filter!="Trending"){
        let data=await Listing.find({"filter":filter});
        res.render("./listing/index.ejs",{data});
    }
    
}