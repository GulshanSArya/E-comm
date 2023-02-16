import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import lion from "./lion.jpg"

function Placeorder() { 
    const [ data , setData ] = useState();
    const [ plot , setPlot ] = useState();
    const [ landmark , setLandmark ] = useState();
    const [ area , setArea ] = useState();
    const [ disst , setDisst ] = useState();
    const [ state , setState ] = useState();
    const [ pincode , setPincode ] = useState();

    let userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
    const location = useLocation();
    const navigate = useNavigate();
    const productId = location.state.productId;
    const quantity = location.state.productquantity;
    
    const placeOrder = async()=>{
           const orderData = {
            plot:plot,
            landmark:landmark,
            area:area,
            disst:disst,
            state:state,
            pincode:pincode,
            productId : productId,
            subTotal : data?.price*quantity,
            quantity: quantity,
            userId : userInfo,
           }
           const response = await axios({
            url:"http://localhost:3001/user/order-address",
            method: "post",
            data: orderData,
          })
          console.log("...........response",response);
          if(response.data.success){
            alert(response.data.message)
            navigate("/productlist")
          }else{
            console.log("........error",response.data.error);
          }
    }
      useEffect(()=>{
        getProductDetails(productId);
        setData(quantity);
        },[])
       
    const getProductDetails = async(productId)=>{
        const result = await axios({
            url:`http://localhost:3001/product-details?productId=${productId}`,
            method:"get",
        });
        if(result.data.success){
            setData(result.data.result)
        }
        console.log("........",data)
    };


  return (
<div className='container' >
    <div className='row1'>
        <div className="col1">
        <img className='order-image' src={lion} alt={lion} />
        </div>
        <div className="col1">
        <span><h2>{data?.name} {data?.description} </h2></span>
        <span><h4>Price : {data?.price} </h4></span>
        <span><h4>Quantity : {quantity} </h4></span>
        <span><h3>Sub-Total  : {(data?.price*quantity)} </h3></span>
        </div>
    </div>
    <div className='row2'> 
        <div className="col3">
          <h3>Shipping Address</h3>
          <input className='inputBox' type="text" placeholder='Plot No. / Street Name'
          value={plot} onChange={(e)=>{setPlot(e.target.value)}} />
          <input className='inputBox' type="text" placeholder='Landmark / Near' 
          value={landmark} onChange={(e)=>{setLandmark(e.target.value)}} />
          <input className='inputBox' type="text" placeholder='Area' 
          value={area} onChange={(e)=>{setArea(e.target.value)}} />
          <input className='inputBox' type="text" placeholder='Distt. Name'
          value={disst} onChange={(e)=>{setDisst(e.target.value)}} />
          <input className='inputBox' type="text" placeholder='State Name'
           value={state} onChange={(e)=>{setState(e.target.value)}} />
          <input className='inputBox' type="text" placeholder='PinCode/ZIP Code' 
          value={pincode} onChange={(e)=>{setPincode(e.target.value)}} />
          <button  type="submit" className='appButton' onClick={placeOrder}>Place Order</button>
        </div>
    </div>
</div>
  )
}

export default Placeorder