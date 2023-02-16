import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./App.css";

function Nav() {
    const userData= localStorage.getItem("userData");
const navigate = useNavigate();
  return (
    <div>
      <nav>
        {/* <img className='logo' src="https://yt3.googleusercontent.com/ytc/AMLnZu907ujnXt1ae1wVUDH8NrYtoLeeI5XCK7OsMU3HCw=s900-c-k-c0x00ffffff-no-rj" alt="logo" /> */}
           
           { userData ? 
            <ul className="nav-ul">
              <li><Link to="/addproduct">Add Product</Link> </li>
              <li><Link to="/productlist">Product List</Link> </li>
              <li><button className="logout" onClick={() => {localStorage.clear();navigate("/login");}}>Logout</button></li>
           </ul>
           :
           <ul className="nav-ul">
              <li><Link to="/signup">Sign Up</Link> </li>
              <li><Link to="/login">Login </Link> </li>
              {/* <span ><img className='avatar' src="https://yt3.googleusercontent.com/ytc/AMLnZu907ujnXt1ae1wVUDH8NrYtoLeeI5XCK7OsMU3HCw=s900-c-k-c0x00ffffff-no-rj" alt="avatar" /></span> */}
            </ul>
           }
        </nav>
    </div>
  )
}
export default Nav;