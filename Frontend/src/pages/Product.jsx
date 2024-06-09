import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    supplierid: "1",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product");
        const { data } = response;
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert("Please enter both name and price.");
      return;
    }

    try {
      const newId = Math.floor(Math.random() * 1000000); // Generate a random ID
      const response = await axios.post(
        "http://localhost:4000/product",
        { ...newProduct, id: newId.toString() }, 
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Product added:", response.data);
      setProducts([...products, response.data.data]);
      setNewProduct({ name: "", price: "", supplierid: "1" });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Enter name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="mt-2"
            />
            <Input
              type="text"
              name="price"
              placeholder="Enter price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="mt-2"
            />
            <button
              type="submit"
              className="bg-black text-white ml-4 py-2 px-6 mt-4 mb-4 rounded"
            >
              Add Product
            </button>
          </form>
          <Separator className="mb-4" />
          {products.map((product) => (
            <Card key={product.id} className="mb-4 shadow-lg">
              <CardHeader>
                <CardTitle className="font-medium">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Price: ${product.price}</p>
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-between">
            <Link to="/" className="bg-black text-white ml-4 py-2 px-6 mt-4 mb-4 rounded">
              Supplies
            </Link>
            <Link to="/shop" className="bg-black text-white ml-4 py-2 px-6 mt-4 mb-4 rounded">
              Shop
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
