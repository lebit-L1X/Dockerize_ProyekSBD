import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductListSupplier from "../components/ProductListSupplier";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SupplierDetail = () => {
  const { id } = useParams();
  const [quantities, setQuantities] = useState({});
  const [totalDebt, setTotalDebt] = useState(0);

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
    const initialQuantities = Object.fromEntries(
      supplier.products.map((product) => [product.id, 0])
    );
    setQuantities(initialQuantities);
  }, [supplier]);

  const handleIncrement = (productId) => {
    setQuantities({
      ...quantities,
      [productId]: quantities[productId] + 1,
    });
  };

  const handleDecrement = (productId) => {
    if (quantities[productId] > 0) {
      setQuantities({
        ...quantities,
        [productId]: quantities[productId] - 1,
      });
    }
  };

  const handleOrder = () => {
    const totalAmount = Object.entries(quantities).reduce(
      (acc, [productId, quantity]) => {
        const product = supplier.products.find(
          (p) => p.id === parseInt(productId)
        );
        return acc + product.price * quantity;
      },
      0
    );
    setTotalDebt(totalDebt + totalAmount);
    console.log("Order placed", quantities);
    setQuantities(
      Object.fromEntries(supplier.products.map((product) => [product.id, 0]))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className=" mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">
            {supplier.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Utang: ${totalDebt}</p>
          <Separator className="my-4" />
          <ProductListSupplier
            products={supplier.products}
            quantities={quantities}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
          <Separator className="my-4" />
        </CardContent>
        <CardFooter>
          <Button
            variant="primary"
            onClick={handleOrder}
            className="w-full bg-black text-white"
          >
            Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SupplierDetail;
