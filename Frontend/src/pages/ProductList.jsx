import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const dummyProducts = [
  {
    id: "1",
    name: "Product A",
    price: 100.0,
    supplier: "SupplierID1",
  },
  {
    id: "2",
    name: "Product B",
    price: 200.0,
    supplier: "SupplierID2",
  },
  {
    id: "3",
    name: "Product C",
    price: 300.0,
    supplier: "SupplierID3",
  },
  {
    id: "4",
    name: "Product D",
    price: 400.0,
    supplier: "SupplierID4",
  },
  {
    id: "5",
    name: "Product E",
    price: 500.0,
    supplier: "SupplierID5",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    supplier: "",
  });

  useEffect(() => {
    // Menggunakan data dummy sebagai data produk
    setProducts(dummyProducts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Product List</CardTitle>
          <Input
            type="text"
            placeholder="Enter something..."
            value={newProduct.name}
            onChange={handleInputChange}
            className="mt-2"
          />
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          {products.map((product) => (
            <Card key={product.id} className="mb-4 shadow-lg">
              <CardHeader>
                <CardTitle className="font-medium">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Price: ${product.price}</p>
                <p>Supplier ID: {product.supplier}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductList;
