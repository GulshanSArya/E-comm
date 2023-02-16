import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const Submitvalue = async () => {
    const data= {
      name:name,
      email:email,
      password:password,
      phone:phone,
      address:address,
    };
    const response = await axios({
      url:"http://localhost:3001/seller-signup",
      method: "post",
      data: data,
    })
    console.log("...........response",response);
    if(response.data.success){
      if(response.data.email===data.email)
      navigate("/login");
    }else{ 
      console.log("........error",response.data.message);
    }
  
  }

  return (
      <div className='book'>
      <h1>SignUp</h1>
        
        <input className='inputBox1' type="text" placeholder="Enter your name"
        value={name} onChange={(e)=>{setName(e.target.value)}}required/><br/>
        <input className='inputBox1' type="email" placeholder="Enter your email" 
        value={email} onChange={(e) =>{setEmail(e.target.value);}} required /><br />
        <input className='inputBox1' type="password" placeholder="Enter your password"
         value={password} onChange={(e) => {setPassword(e.target.value);}}required/><br />
        <input className='inputBox1' type="number" placeholder="Enter your phone number"
        value={phone} onChange={(e) => {setPhone(e.target.value);}} required /><br />
        <input className='inputBox1' type="text" placeholder="Enter your address"
        value={address} onChange={(e) => { setAddress(e.target.value); }} required /><br /><br />

        <button className='appButton1' value="submit" onClick={()=> Submitvalue() }>SignUp</button>
    
    </div>
  );
}

export default SignUp;
