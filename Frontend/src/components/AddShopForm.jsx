import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const AddShopForm = ({ onHide }) => {
  const [shopName, setShopName] = useState("");
  const [balance, setBalance] = useState("");

  const handleAddShop = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/shop", {
        shop_name: shopName,
        balance: parseFloat(balance),
      });
      const data = response.data;
      if (data.success) {
        // Refresh the shop list or notify the parent component
        onHide();
      } else {
        console.error("Failed to add shop:", data.message);
      }
    } catch (error) {
      console.error("Error adding shop:", error);
    }
  };

  return (
    <Card className="mb-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Add New Shop</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddShop}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Shop Name
            </label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Balance
            </label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <Button type="submit" className="bg-black text-white">
            Add Shop
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={onHide} className="bg-red-500 text-white">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddShopForm;
