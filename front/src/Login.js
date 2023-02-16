import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./App.css";
import axios from 'axios';

function Login() {

    const[email,setEmail]= useState("");
    const[password,setPassword]= useState("");
 
    const navigate = useNavigate();
   
    useEffect(()=>{
        //loginsubmit();
    },[])

 const loginsubmit = async () =>{
    const data = {
        email:email,
        password:password,
    }
    const response = await axios ({
        method:'post',
        url:"http://localhost:3001/seller-login",
        data:data,
    });
    //console.log("//////////////// data",data);
    console.log("////////////////response",response);
    if(response){
      localStorage.setItem("userData",JSON.stringify(response.data.data))
      navigate("/productlist") 
  
}else{
  response.status(200).send({
    message:"user not found",
    
})
}
 }
  

  return (
    <div className='book'>
        <h1>Login</h1>
        <input className='inputBox' type="email" placeholder='Enter your email' 
          value = {email} onChange={(e)=>setEmail(e.target.value)} />
        <input className='inputBox' type="password" placeholder='Enter your password' 
          value = {password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className='appButton' type='submit' onClick={loginsubmit}>Login</button>
    </div>
  )
}

export default Login;