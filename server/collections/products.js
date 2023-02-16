const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
   name:String,
   description:String,
   price:Number,
   quantity:Number,
},
{timestamps:{CreatedAt: "created_ts ",updateAt : "uddate_ts"}}
);
//productsSchema.set("toObject",{ virtuals:true})
//productsSchema.set("toJSON",{ virtuals:true})
const Products= mongoose.model("products",productsSchema);
module.exports = Products;