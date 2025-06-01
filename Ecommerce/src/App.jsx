import React from 'react'
import './App.css'
import NavBar from '../src/component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from '../src/Pages/Shop';
import ShopCategory from '../src/Pages/ShopCategory';
import Product from '../src/Pages/Product';
import Cart from '../src/Pages/Cart';
import Login from '../src/Pages/Login';
import Signup from '../src/Pages/Signup';
import Footer from './component/Footer/Footer';
import men_banner from './component/Assets/banner_mens.png'
import women_banner from './component/Assets/banner_womens.png'
import kid_banner from './component/Assets/banner_kids.png'
import Checkout from './component/Checkout/checkout';

function App() {
  return (
    <div>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<Shop />}/>
      <Route path='/mens' element={<ShopCategory banner={men_banner} category='men' />}/>
      <Route path='/womens' element={<ShopCategory banner={women_banner} category='women' />}/>
      <Route path='/kids' element={<ShopCategory banner={kid_banner} category='kid' />}/>
      <Route path='/product' element={<Product />}>
      <Route path=':productId' element={<Product />}/>
      </Route>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/checkout' element={<Checkout />}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App