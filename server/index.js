const express = require("express");
const mongoose = require("mongoose");
require("./db/connection");
const Sellers = require("./collections/sellers");
const Products = require("./collections/products");
const Users = require("./collections/users");
const Orders = require("./collections/orders");
const cors = require("cors");

const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Create Seller Signup Product API
app.post("/seller-signup", async (req, res) => {
  const body = req.body;
  console.log(".......body", body);
  const data = {
    name: body.name,
    email: body.email,
    password: body.password,
    phone: body.phone,
    address: body.address,
  };
  // const existuser = await Sellers.findOne(data.email=email)
  // if(existuser){
  //   return res.status(422).json("email alredy exist")
  // }
  const result = await Sellers.create(JSON.stringify( data));
  console.log(".......result", result);
  if (result) {
    res.send({
      success: true,
      message: "Seller signup successfully.",
      data: result,
    });
  }
});

// Create Add LOGIN API
app.post("/seller-login", async (req, res) => { 
  const { email, password } = req.body;

  const result = await Sellers.findOne({ email: email });
  console.log(".......result", result);
  if (result) {
    res.status(200).send({
      message: "loggedin successfully",
    });
  } else {
    res.status(200).send({
      message: "user not found",
    });
  }
});

// Create Add Product API
app.post("/add-product", async (req, res) => {
  const body = req.body;
  console.log(".......body", body);
  const data = {
    name: body.name,
    description: body.description,
    price: body.price,
    quantity: body.quantity,
  };
  const result = await Products.create(data);
  console.log(".......result", result);

  res.send({
    success: true,
    message: "Product added successfully.",
    result: result,
  });
});

//Create Product List API
app.get("/product-list", async (req, res) => {
  const allProduct = await Products.find();

  res.send({
    success: true,
    message: "Products found successfully.",
    result: allProduct,
  });
});

//Create Product Details API
app.get("/product-details", async (req, res) => {
  let productId = req.query.productId;
  console.log("......productId", productId);

  productId = mongoose.Types.ObjectId(productId.trim());
  const productDetail = await Products.findOne({ _id: productId });

  res.send({
    success: true,
    message: "Products Details found successfully.",
    result: productDetail,
  });
});

// Create Edit Product API
app.post("/edit-product/:productId", async (req, res) => {
  const body = req.body;
  console.log(".......body", body);
  const productId = req.params.productId;

  const data = {
    name: body.name,
    description: body.description,
    price: body.price,
    quantity: body.quantity,
  };
  const result = await Products.updateOne(
    { _id: mongoose.Types.ObjectId(productId) },
    data
  );
  console.log(".......result", result);

  res.send({
    success: true,
    message: "Product added successfully.",
    result: result,
  });
});

//Create Product Delete API
app.delete("/delete-product", async (req, res) => {
  let productId = req.query.productId;
  console.log("......productId", productId);

  productId = mongoose.Types.ObjectId(productId.trim());
  const productDetail = await Products.deleteOne({ _id: productId });

  res.send({
    success: true,
    message: "Products Deleted successfully.",
    result: productDetail,
  });
});

//Create Find product API
// app.get("/find-product", async (req,res)=>{
//     // const id = req.params.id;
//     // console.log(">>>id", id);
//     // const result = await Products.findOne({_id : id});
//     const result = await Products.find();
//  //const result = Products.findOne();
// // console.log("...............id",id);
// console.log("...............result",result);

// if(result){
//    res.send({
//      sucess:true,
//      message: "user found sucessfully",
//      data : result,
//    });

//   }else{
//    res.send({
//      sucess:false,
//      message: "user not found"
//    });
//   }
//   console.log("........ data result",result);
//  });

//Create Delete API
// app.delete("/delete-product",async (req,res)=>{
//     const id = req.params.id;
//     const  result = await Products.deleteOne({_id:id});
//     console.log("....id",id);

//     res.send({
//         success:true,
//         message:"product deleted ",
//         //result:result,
//     });

//     });

// Create User Signup API
app.post("/user-signup", async (req, res) => {
  const body = req.body;
  console.log(".......body", body);
  const data = {
    name: body.name,
    email: body.email,
    password: body.password,
  };
  const existuser = await Users.findOne({ email: data.email });
  if (existuser) {
    return res.send("email alredy exist");
  }
  const result = await Users.create(data);
  console.log(".......result", result);
  if (result) {
    res.send({
      success: true,
      message: "Seller signup successfully.",
      result: result,
    });
  }
});

// Create User LOGIN API
app.post("/user-login", async (req, res) => {
  const body = req.body;

  const data = {
    email: body.email,
    password: body.password,
  };
  const result = await Users.findOne({ email: data.email });
  console.log(".......result", result);
  if (result) {
    res.send({
      success: true,
      message: "user login successfully",
      data : result
    });
  } else {
    res.send({
      success: false,
      message: "wrong detail",
    });
  }
});

// Create order address API //
app.post("/user/order-address", async (req, res) => {
  const body = req.body;
  console.log(".......body", body);
  const data = {
      productId: body.productId,
      userId : body.userId,
      subTotal: body.subTotal,
      status : "Pending",
      quantity :body.quantity,
    address: {
      plot: body.plot,
      landmark: body.landmark,
      area: body.area,
      disst: body.disst,
      state: body.state,
      pincode: body.pincode,
    },
  };
  const result = await Orders.create(data);
  console.log(".......result", result);
  if (result) {
    // decrease product quantity
    res.send({
      success: true,
      message: "Order places successfully.",
      result: result,
    } );
  }else{
    res.send({
        success: false,
        message: "Oder failed.",
      });
  }
});

// get all product for seller
app.get("/all-products", async(req,res)=>{ 
  
    const allOrders = Orders.find([
        {$lookup : {
          from : "products",
          localField : "productId",
          foreignField : "_id",
           
          as : "productInfo"
      }},
      { $lookup : {
        from : "users",
        localField : "userId",
        foreignField : "_id",
         
        as : "userInfo"
    }},
    ]) 
    if (allOrders) {
      res.send({
        success: true,
        message: "Oders found successfully.",
        data: allOrders,
      });
    }
})

// get all product for user
app.get("/user/my-products/:userId", async(req,res)=>{

    const userId = req.params.userId
    const allOrders = await Orders.aggregate([
        {$match : {userId : mongoose.Types.ObjectId(userId)}},

        { $lookup : {
            from : "products",
            localField : "productId",
            foreignField : "_id",
             
            as : "productInfo"
        }},
    ])
    console.log(">>>>>>>>>>allOrders", allOrders);
    if (allOrders) {
        // decrease product quantity
        res.send({
          success: true,
          message: "Oders found successfully.",
          data: allOrders,
        });
      }else{
        res.send({
            success: false,
            message: "No oders found.",
          });
      }
})


app.listen(port);
console.log(`server running on port......${port}`);
 