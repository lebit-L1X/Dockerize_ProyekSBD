import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Shop = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopResponse = await axios.get("http://localhost:4000/shop");
        const shopData = shopResponse.data;
        if (!shopData.success) {
          console.error("Failed to fetch shops:", shopData.message);
          return;
        }

        const productResponse = await axios.get("http://localhost:4000/product");
        const productData = productResponse.data;
        if (!productData.success) {
          console.error("Failed to fetch products:", productData.message);
          return;
        }

        const productsMap = productData.data.reduce((map, product) => {
          map[product._id] = product;
          return map;
        }, {});

        const populatedShops = shopData.data.map((shop) => ({
          ...shop,
          products: shop.products.map((shopProduct) => ({
            ...shopProduct,
            product: productsMap[shopProduct.product],
          })),
        }));

        setShops(populatedShops);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shop List</h1>
      <Separator className="mb-4" />
      <div className="mb-4">
        <Link to="/">
          <button className="bg-black text-white ml-4 py-2 px-6 mt-4 mb-4 rounded">
            Go to Supplier
          </button>
        </Link>
        <Link to="/product">
          <button className="bg-black text-white ml-4 py-2 px-6 mt-4 mb-4 rounded">
            Go to Product
          </button>
        </Link>
      </div>
      {shops.map((shop) => (
        <Card key={shop.id} className="mb-4 shadow-lg">
          <CardHeader>
            <CardTitle className="font-medium">{shop.shop_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Balance: ${shop.balance}</p>
            <h2>Products:</h2>
            <ul>
              {shop.products.map((product) => (
                <li key={product.product.id}>
                  {product.product.name} - Stock: {product.stock}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Shop;
