import React from "react";
import { Route, Routes } from "react-router-dom";
import Supplier from "./pages/Supplier";
import Product from "./pages/Product";
import Shop from "./pages/Shop";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Supplier />} />
      <Route path="/product" element={<Product />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  );
}

export default App;
