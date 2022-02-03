import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Categories from "../pages/categories/Categories";
import HomePage from "../pages/home/Home";
import Navbar from '../components/common/Navbar'
import Cart from "../pages/cart/Cart";
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";
import ProductDetails from "../pages/productDetails/ProductDetails";
import PaymentForm from "../components/common/PaymentForm";
import ProductItems from "../pages/products/ProductItems";

export default function Routing() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={"/"} exact element={<HomePage/>} />
        <Route path={"/login"} exact element={<Login />} />
        <Route path={"/register"} exact element={<Register />} />
        <Route path={"/product"} element={<ProductItems />}/>
        <Route path={"/product-details/:id"} element={<ProductDetails />}/>
        <Route path={"/categories"} element={<Categories />}/>
        <Route path={"/cart"} element={<Cart />}/>
        <Route path={"/payment"} element={<PaymentForm />}/>
      </Routes>
    </Router>
  );
}
