const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
},
{timestamps:{CreatedAt: "created_ts ",updateAt : "update_ts"}}
);
//productsSchema.set("toObject",{ virtuals:true})
//productsSchema.set("toJSON",{ virtuals:true})
const Users= mongoose.model("users",usersSchema);
module.exports = Users;