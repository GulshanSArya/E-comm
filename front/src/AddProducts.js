import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function AddProducts() {
    const [ name  , setName  ] = useState("");
    const [ description , setDescription] = useState("");
    const [ price  , setPrice  ] = useState(null);
    const [ quantity   , setQuantity   ] = useState(null);

    const location = useLocation();
    const productId = location?.state?.productId;
    console.log(".......productId",productId);
    const navigate = useNavigate();

    useEffect(() => {
     if(productId){
      getProductDetails(productId);
     }
    },[]);

    const getProductDetails = async(productId)=>{
      const result = await axios({
          url:`http://localhost:3001/product-details?productId=${productId}`,
          method:"get",
      });
      if(result.data.success){
           const productDetail = result.data.result;
           console.log("............productDetail",productDetail);
           if(productDetail){
            setName(productDetail?.name);
            setDescription(productDetail?.description);
            setPrice(productDetail?.price);
            setQuantity(productDetail?.quantity);
           }
      }
  };

  const addproduct = async ()=>{
   
      const data={
      name:name,
      description:description,
      price:price,
      quantity:quantity,
     }
       const response = await axios({
           url: "http://localhost:3001/add-product",
           method: "post",
           data: data,
       })
      console.log("........response",response);
      if(response.data.success){
        navigate("/productlist")
      }
  }

  return (
  
    <div className='book'>
      <h1>{ productId ? "Edit Product" : "Add Product"}</h1>  
      <input className='inputBox' type="text" placeholder='Enter product name'
       value={name} onChange={(e)=>{setName(e.target.value)}} />
 
      <input className='inputBox'type="textarea" placeholder='Enter product description' 
      value={description} onChange={(e)=>{setDescription(e.target.value)} } />
     
      <input className='inputBox' type="number" placeholder='Enter Price'
       value={price} onChange={(e)=>{setPrice(e.target.value)}} />
    
      <input className='inputBox' type="number" placeholder='Enter quantity' 
       value={quantity} onChange={(e)=>{setQuantity(e.target.value)} }/> 

      <button className='appButton' onClick={addproduct}>Add Product</button>
    </div>
    
  )
}

export default AddProducts;
