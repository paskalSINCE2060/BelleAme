import React from 'react'

import './App.css'
import NavBar from '../src/component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from '../src/Pages/Shop';
import ShopCategory from '../src/Pages/ShopCategory';
import Product from '../src/Pages/Product';
import Cart from '../src/Pages/Cart';
import LoginSignup from '../src/Pages/LoginSignup';
import Footer from './component/Footer/Footer';
import men_banner from './component/Assets/banner_mens.png'
import women_banner from './component/Assets/banner_womens.png'
import kid_banner from './component/Assets/banner_kids.png'

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
      <Route path='/login' element={<LoginSignup />}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App
