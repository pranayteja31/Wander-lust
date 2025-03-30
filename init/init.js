const mongoose=require("mongoose");
const {data}=require("./data.js");
const Listing=require("../models/listing.js");


main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
};

let initDB= async()=>{
  await Listing.deleteMany({});
  let datauser=data.map((obj)=>({...obj,owner:'67c87235dc6531638d79646e'}));
  await Listing.insertMany(datauser);
  console.log("insertion successful");
};
initDB();
