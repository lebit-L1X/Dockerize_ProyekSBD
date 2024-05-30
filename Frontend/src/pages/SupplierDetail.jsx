import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SupplierDetail = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [shopBalance, setShopBalance] = useState(1000);

  const supplier = {
    id,
    name: "Supplier ABC",
    products: [
      { id: 1, name: "Product 1", stock: 50, price: 10 },
      { id: 2, name: "Product 2", stock: 30, price: 20 },
      // Produk lainnya
    ],
  };

  useEffect(() => {
    console.log("SupplierDetail component mounted");
  }, []);

  const addToCart = (product, quantity) => {
    setCart([...cart, { ...product, quantity }]);
  };

  const handleOrder = () => {
    console.log("Order placed", cart);
    setCart([]);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{supplier.name}</h1>
        <p className="text-lg mb-4">Saldo Toko: ${shopBalance}</p>
        <hr className="my-4" />
        <div className="my-4">
          <ProductList products={supplier.products} addToCart={addToCart} />
        </div>
        <hr className="my-4" />
        <div className="my-4">
          <Cart cart={cart} handleOrder={handleOrder} />
        </div>
        <Button variant="primary" onClick={handleOrder} className="w-full mt-4">
          Order
        </Button>
      </Card>
    </div>
  );
};

export default SupplierDetail;
