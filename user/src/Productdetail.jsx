import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate,} from 'react-router-dom';
import lion from "./lion.jpg"

function Productdetail() {
   const [ productDetail, setProductDetail ] = useState();
   const [ quantity, setQuantity ] = useState();

     const navigate = useNavigate();
     const location = useLocation();
     const productId = location.state.productId;

    useEffect(()=>{
    //productId = location.state.productId; 
    console.log(".......productId",productId);
    getProductDetails(productId);
    },[productId]) 

const getProductDetails = async(productId)=>{
    const result = await axios({
        url:`http://localhost:3001/product-details?productId=${productId}`,
        method:"get",
    });
    if(result.data.success){
        setProductDetail(result.data.result)
    }
};
  
return (
    <div className='product-details'>
        <h1>Product Details</h1>
        <img className='image-detail' src={lion} alt={lion} />
        <div>
            <span>Name : </span>
            <span >{productDetail?.name}</span>
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
            <input type="number" placeholder='enter number of quantity' value={quantity}
            onChange={(e)=>{setQuantity(e.target.value)}} />
        </div> 
        <div>
            <button onClick={()=>navigate("/placeorder",{state:{ productId : productDetail._id , productquantity : quantity}
            })}>Buy Now</button>
            <button>Add TO Cart</button>
        </div> 
    </div> 
  )
}

export default Productdetail; 