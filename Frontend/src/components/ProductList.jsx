import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ProductList = ({ products, addToCart }) => {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(products.map((product) => [product.id, 0]))
  );

  const handleAddToCart = (product) => {
    addToCart(product, quantities[product.id]);
    // Reset kuantitas ke 0 setelah ditambahkan ke keranjang
    setQuantities({ ...quantities, [product.id]: 0 });
  };

  const handleIncrementQuantity = (productId) => {
    setQuantities({
      ...quantities,
      [productId]: quantities[productId] + 1,
    });
  };

  const handleDecrementQuantity = (productId) => {
    if (quantities[productId] > 0) {
      setQuantities({
        ...quantities,
        [productId]: quantities[productId] - 1,
      });
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Product List</h2>
      {products.map((product) => (
        <div key={product.id} className="mb-4">
          <p>{product.name}</p>
          <div className="flex items-center">
            <Button
              variant="outline"
              onClick={() => handleDecrementQuantity(product.id)}
              className="mr-2"
            >
              -
            </Button>
            <span className="mx-2">{quantities[product.id]}</span>
            <Button
              variant="outline"
              onClick={() => handleIncrementQuantity(product.id)}
              className="mr-2"
            >
              +
            </Button>
            <Button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
