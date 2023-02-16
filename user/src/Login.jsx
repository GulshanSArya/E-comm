import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [email ,setEmail ]= useState("");
  const [password ,setPassword ]= useState("");

  const navigate = useNavigate();

 const submitlogin =async (e) => {
  e.preventDefault();

const data = {
  email:email,
  password:password,
}
const response = await axios ({
  method:'post',
  url:"http://localhost:3001/user-login",
  data:data,
});
console.log("////////////////response",response);
if(response.data.success){
  localStorage.setItem("userInfo", JSON.stringify(response.data.data))
console.log("user login successfully")
navigate("/productlist") 
}else{
  console.log("user not login successfully")
}
}

return (
  <div className='book'>
     <h1>Login</h1>
     
    <form onSubmit={submitlogin}>
    <input className='inputBox' type="email" placeholder='enter your email' required 
    value={email} onChange={(e)=>{setEmail(e.target.value)}} />
    <input className='inputBox' type="password" placeholder='enter your password' required 
    value={password} onChange={(e)=>{setPassword(e.target.value)}} />
    <input className='appButton' type="submit" value="Login" />
  </form>
  </div>
  )
}

export default Login;