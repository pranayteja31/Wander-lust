const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./reviews.js");

const listingSchema= new Schema({
    title:{
        type:String,
        required:true
    },
        
    description:String,
    image:{
        url:{
            type:String,
            default:"https://images.unsplash.com/photo-1739477021524-0266d3dabec9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set:(v)=>
            v==="" 
            ? "https://images.unsplash.com/photo-1739477021524-0266d3dabec9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            :v,
        },
        filename:String
        }
        ,
    price:Number,
    location:String,
    country:String,
    review:[
        {
            type:Schema.Types.ObjectId,
            ref:"review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry : {
        coordinates: {
          type: [Number],
          required: true
        }
    },
    filter:{
        type:String,
        enum:["Mountain","Room","Castle","Iconic-City","Arctic","Beach","Pool"],
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        
        await Review.deleteMany({_id:{$in:listing.review}});
    }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
