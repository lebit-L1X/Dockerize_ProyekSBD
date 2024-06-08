import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const ProductListSupplier = ({
  products,
  quantities,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Product List</h2>
      {products.map((product) => (
        <Card key={product.id} className="mb-4">
          <CardHeader>
            <CardTitle className="font-medium">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Stock: {product.stock}</p>
            <p>Price: ${product.price}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={() => handleDecrementQuantity(product.id)}
                className="mr-2 bg-black text-white"
              >
                -
              </Button>
              <span className="mx-2">{quantities[product.id]}</span>
              <Button
                variant="outline"
                onClick={() => handleIncrementQuantity(product.id)}
                className="mr-2 bg-black text-white"
              >
                +
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductListSupplier;
