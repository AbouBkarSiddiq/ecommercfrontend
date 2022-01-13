import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Categories from "../components/Categories";
import Main from "../components/main";
import Navbar from '../components/Navbar'
import Product from "../components/Products";
import Cart from "../components/Cart";
import Login from "../components/Login";
import Register from "../components/Register";
import ProductDetails from "../components/ProductDetails";

export default function Routing() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={"/"} exact element={<Main />} />
        <Route path={"/login"} exact element={<Login />} />
        <Route path={"/register"} exact element={<Register />} />
        <Route path={"/product"} element={<Product />}/>
        <Route path={"/product-details/:id"} element={<ProductDetails />}/>
        <Route path={"/categories"} element={<Categories />}/>
        <Route path={"/cart"} element={<Cart />}/>
      </Routes>
    </Router>
  );
}
