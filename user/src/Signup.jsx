import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./App.css";


function Signup() {
  const [name ,setName ]= useState("");
  const [email ,setEmail ]= useState("");
  const [password ,setPassword ]= useState("");

  const navigate = useNavigate();

  const submitsignup = async(e) => {
    e.preventDefault()
  
    const data= {
      name:name,
      email:email,
      password:password,
    };
const response = await axios({
      url:"http://localhost:3001/user-signup",
      method: "post",
      data: data,
    })
    console.log("...........response",response);
    if(response.data.success){
      navigate("/login");
    }else{
      console.log("........error",response.data.error);
    }
}
return (  
  <div className='book'>
     <h1>SignUp</h1>

    <form onSubmit={submitsignup}>
      <input className='inputBox' type="text" placeholder='enter Your name' required 
      value={name} onChange={(e)=>{setName(e.target.value)}} />
      <input className='inputBox' type="email" placeholder='enter your email' required 
      value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      <input className='inputBox' type="password" placeholder='enter your password' required 
      value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      <input className='appButton' type="submit" value="Sign Up" />
    </form>
    </div>
  )
}

export default Signup