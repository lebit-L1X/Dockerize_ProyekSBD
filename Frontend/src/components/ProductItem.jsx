import React, { useState } from "react";

const ProductItem = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity);
      setQuantity(0);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="font-semibold">{product.name}</h3>
      <p>Stock: {product.stock}</p>
      <p>Price: ${product.price}</p>
      <div className="flex items-center mt-2">
        <button
          className="border p-2 rounded-l bg-gray-200"
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 0}
        >
          -
        </button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="border-t border-b w-12 text-center"
        />
        <button
          className="border p-2 rounded-r bg-gray-200"
          onClick={() => setQuantity(quantity + 1)}
          disabled={quantity >= product.stock}
        >
          +
        </button>
      </div>
      <button
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
        onClick={handleAdd}
        disabled={quantity <= 0 || quantity > product.stock}
      >
        Add Product
      </button>
    </div>
  );
};

export default ProductItem;
