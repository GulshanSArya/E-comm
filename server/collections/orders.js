const mongoose = require("mongoose");
const ordersSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Types.ObjectId, ref: "products" },
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
    status: String,
    quantity: Number,
    subTotal: Number,
    address: Object,
  },
  { timestamps: { CreatedAt: "created_ts ", updateAt: "uddate_ts" } }
); 
const Orders = mongoose.model("orders", ordersSchema);
module.exports = Orders;
