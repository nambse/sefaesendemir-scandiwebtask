import React, { Component } from "react";
import Header from "./components/UI/Header/Header";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Category />} />
          <Route path="/:category" element={<Category />} />
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
