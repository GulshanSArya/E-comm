import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lion from "./lion.jpg"
import Slider from './Slider';

function Productlist() {

const [ data, setData ] = useState([]);

const navigate  = useNavigate();

useEffect(()=>{
  fetchProduct();
},[])

const fetchProduct = async() =>{
  const response = await axios({
    url:"http://localhost:3001/product-list",
    method:"get",
  });
  console.log("/.////////////response",response);
  setData(response.data.result)
} 

return (
  <>
  <Slider/>
    <div className ='product-lists'>
      {data.map((product,index)=>(
      <ul className="column">
        <img className='image' src={lion} alt={lion} />
        <li key={index}>Sr.No. : {index+1}</li>
        <li onClick={()=>
        navigate("/productdetail",{state:{ productId : product._id },})}>Name : <span className='li-name'>{product.name}</span></li>
        <li>Price : {product.price}</li>
        <li>Description : {product.description}</li>
        <li>Quantity : {product.quantity}</li>
        <button className='buynow' onClick={()=> navigate("/placeorder")}>BUY NOW</button>
        <button className='buynow'>ADD TO CART</button>
      </ul>
      )
      )}
     
    </div>
    </>
  )
}

export default Productlist;