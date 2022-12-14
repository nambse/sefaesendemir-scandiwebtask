import React, { Component } from "react";
import Header from "./components/UI/Header/Header";
import Category from "./pages/Category";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Category />} />
          <Route path="/:category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
