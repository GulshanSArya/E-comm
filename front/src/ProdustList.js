import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';


function ProductList() {
    const [ allProducts , setAllProducts ] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
      getAllProducts();
    },[]);

    const getAllProducts = async ()=>{

        const result = await axios({
            url:"http://localhost:3001/product-list",
            method:"get",
        })
        if(result.data.success){
          setAllProducts(result.data.result);
        }
        
    }  

  return (
    <div className='product-list'>
      <h1>Product List</h1>  
      <ul>
        <li>Name</li>
        <li>Description</li>
        <li>Price</li>
        <li>quantity</li>  
    </ul> 
    <div>
    
    {allProducts ?
         allProducts.map((product)=>(
        <ul>
        <li onClick={()=>
        navigate("/productdetail",{state:{ productId : product._id },})} className="first-li">{product.name}</li>
        <li>{product.description}</li>
        <li>{product.price}</li>
        <li>{product.quantity}</li>
    </ul> 
        ))
        :"no product found"
        }
        </div>

    </div>
  )
}

export default ProductList;