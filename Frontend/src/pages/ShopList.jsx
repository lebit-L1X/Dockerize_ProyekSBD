import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AddShopForm from "../components/AddShopForm";

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:4000/shop");
        const data = response.data;
        if (data.success) {
          setShops(data.data);
        } else {
          console.error("Failed to fetch shops:", data.message);
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleHideAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shop List</h1>
        <Button onClick={handleShowAddForm} className="bg-black text-white">
          Add Shop
        </Button>
      </div>
      <Separator className="mb-4" />
      {showAddForm && <AddShopForm onHide={handleHideAddForm} />}
      {shops.map((shop) => (
        <Card key={shop.id} className="mb-4 shadow-lg">
          <CardHeader>
            <CardTitle className="font-medium">{shop.shop_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Balance: ${shop.balance}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ShopList;
