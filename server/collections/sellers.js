const mongoose = require("mongoose");
const sellersSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    address:String,
},
{timestamps:{CreatedAt: "created_ts ",updateAt : "uddate_ts"}}
);
const Sellers= mongoose.model("sellers",sellersSchema);
module.exports = Sellers;