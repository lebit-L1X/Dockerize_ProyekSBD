import React, { useEffect, useState} from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import axios from "axios";

const ShopDetails = () => {
  const { id } = useParams();
  const [shopBalance, setShopBalance] = useState(300000);

  const handleAddBalance = (price) => {
    setShopBalance(shopBalance + price);
  };
  
  const navigate = useNavigate();
  const shop = {
    id: "1",
    shop_name: "Shop ABC",
    balance: 300000,
    products: [
      { id: 1, name: "Product 1", paid: true, stock: 50, price: 10000 },
      { id: 2, name: "Product 2", paid: false, stock: 30, price: 20000 },
      // Produk lainnya
    ],
  };

  const handlePayment = (price) => {
    setShopBalance(shopBalance - price);
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center ">
        <h1 className="text-4xl">Shop Details</h1>
        <div className="mt-4 mb-4 px-4 py-4 border rounded-lg bg-white">
          <h2 className="text-2xl mb-2">Shop Name: {shop.shop_name}</h2>
          <p className="text-xl">Balance: Rp {shopBalance}</p>
        </div>
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg mt-4 justify-items-center">
          <Table className="">
            <TableCaption>List products available in the shop</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Paid Status</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Sell Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shop.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.paid ? "Paid" : "Unpaid"}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">Rp. {product.price}</TableCell>
                  <TableCell className="flex justify-evenly">
                    <Button onClick={() => handleAddBalance(product.price)}>Sell</Button>
                    <Button onClick={() => handlePayment(product.price)} disabled={product.paid}>Pay</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={() => navigate("/suppliers")}>Make Orders</Button>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
