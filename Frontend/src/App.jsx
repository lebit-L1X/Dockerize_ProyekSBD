import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopDetails from "./pages/ShopDetails";
import SupplierDetail from "./pages/SupplierDetail";
import SupplierList from "./pages/SupplierList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop/" element={<ShopDetails />} />
      <Route path="/suppliers/" element={<SupplierList />} />
      <Route path="/supplier/:id" element={<SupplierDetail />} />
    </Routes>
  );
}

export default App;
