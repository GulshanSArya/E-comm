import React from 'react';
import '../App.css'
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import Nav from '../Nav';
import Home from '../Home';
import SignUp from '../SignUp';
import Login from '../Login';
import AddProducts from '../AddProducts';
import ProductList from '../ProdustList';
import Productdetail from '../Productdetail';


function PublicRoutes() {
  return (
    <div className="App">
        <BrowserRouter>
        <Nav/>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addproduct' element={<AddProducts />} />
        <Route path='/productlist' element={<ProductList />} />
        <Route path='/productdetail' element={<Productdetail />} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default PublicRoutes