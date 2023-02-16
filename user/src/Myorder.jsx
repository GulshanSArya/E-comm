import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

function Myorder() {
   const [ alldata ,setAllData] = useState([]);
 const userInfo = localStorage.getItem("userInfo")
  const userId = userInfo._id

useEffect(()=>{
    fetchAllData();
},[])
 
   const fetchAllData = async() => {
    const result = await axios({
        method: "get",
        url:`http://localhost:3001/user/my-products/${userId}}`,

    })
    
    console.log("/////////////////...result",result);
    if(result.data.success){
        setAllData(result.data.data)
    }
    
};
   

  return (
    <div>

      {alldata.map((item)=>(
        <ul>
          <li>{item.productId}</li>
          <li>{item.address.plot},{item.address.landmark},{item.address.area},{item.address.disst},{item.address.pincode}</li>
          <li>{item.productInfo[0].name} - {item.productInfo[0].description}</li>
          <li>{item.quantity}</li>
          <li>{item.status}</li>
          <li>{item.subTotal}</li>
          <li></li>
        </ul>
      ))}
    </div>
  )
}

export default Myorder;