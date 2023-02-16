import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Nav() {
  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  return (
    <div>
      <nav>
      { !userInfo ? 
        <ul className="nav-ul">
         <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login </Link></li>
        </ul>
        :
        <ul className="nav-ul">
          <li><Link to="/productlist">Product List</Link></li>
          <li><Link to="/myorder">My Orders</Link></li>
          <li><button className="logout" onClick={() => {localStorage.clear();navigate("/login");}}>Logout</button></li>
          <li> <Link to="/cart"><ShoppingCartIcon /></Link></li>
          </ul>
}
      </nav>
    </div>
  );
}

export default Nav;
