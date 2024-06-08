import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopDetails from "./pages/ShopDetails";
import SupplierDetail from "./pages/SupplierDetail";
import SupplierList from "./pages/SupplierList";
import ShopList from "./pages/ShopList";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shops" element={<ShopList />} />
      <Route path="/shop/:id" element={<ShopDetails />} />
      <Route path="/suppliers" element={<SupplierList />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/supplier/:id" element={<SupplierDetail />} />
    </Routes>
  );
}

// const App = () => {
//   return (
//     <div className="flex flex-col mx-auto w-full max-wo[1000px]">
//       <section className="min-h-screen flex flex-col">
//         <main className="flex-1 p-4 flex flex-col items-center justify-center gap-4">
//           <h2 className="text-4xl">FreshMarket</h2>
//           <button className="bg-green-600 text-white p-2 hover:bg-gray-400">
//             Get Started Here
//           </button>
//         </main>
//       </section>
//     </div>

//   );
// };

export default App;
