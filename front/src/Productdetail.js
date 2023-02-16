import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Productdetail() {
   const [ productDetail, setProductDetail ] = useState();

     const location = useLocation();
     const navigate = useNavigate();
     const productId = location.state.productId;

    useEffect(()=>{
    //productId = location.state.productId; 
    console.log(".......productId",productId);
    getProductDetails(productId);
    },[])

const getProductDetails = async(productId)=>{
    const result = await axios({
        url:`http://localhost:3001/product-details?productId=${productId}`,
        method:"get",
    });
    if(result.data.success){
        setProductDetail(result.data.result)
    }
};
  const onclickEdit=() =>{
  navigate("/addproduct",{state:{ productId : productId }});
  };

const onDelete= async()=>{
    const response = await axios({
        method:"delete",
        url:`http://localhost:3001/delete-product?productId=${productId}`
    });
    console.log(".....response",response);
    if(response?.data?.success){
        navigate("/productlist");
    }
}
return (
    <>
        <h1>Product Details</h1>
        <div>
            <span>Name : </span>
            <span>{productDetail?.name}</span>
        </div>
        <div>
            <sapn>Description : </sapn>
            <span>{productDetail?.description}</span>
        </div>
        <div>
            <span>Price : </span>
            <span>{productDetail?.price}</span>
        </div>
        <div>
            <span>Quantity : </span>
            <span>{productDetail?.quantity}</span>
        </div> 
        <div>
            <span><button onClick={()=>onclickEdit()}>Edit</button></span>
            <span><button onClick={()=>onDelete()}>Delete</button></span>
        </div> 
    </> 
  )
}

export default Productdetail; 