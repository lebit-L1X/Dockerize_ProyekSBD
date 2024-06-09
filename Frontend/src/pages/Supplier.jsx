import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductListSupplier from "../components/ProductListSupplier";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown";

const SupplierDetail = () => {
  const { id } = useParams();
  const [quantities, setQuantities] = useState({});
  const [totalDebt, setTotalDebt] = useState(0);
  const [supplier, setSupplier] = useState({
    id,
    name: "",
    products: [],
  });
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [formData, setFormData] = useState({
    shop_id: "1", // Default shop id
    products: [],
  });

  useEffect(() => {
    console.log("SupplierDetail component mounted");

    const fetchSupplierData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/supplier/${id}`
        );
        const supplierData = response.data;

        const mappedSupplier = {
          id: supplierData.id,
          name: supplierData.name,
          products: supplierData.products.map((product) => ({
            id: product.id,
            name: product.name,
            stock: product.stock,
            price: product.price,
          })),
        };

        const initialQuantities = Object.fromEntries(
          mappedSupplier.products.map((product) => [product.id, 0])
        );

        setQuantities(initialQuantities);
        setSupplier(mappedSupplier);

        // Set initial form data with product ids and amount 0
        const initialFormData = {
          shop_id: "1",
          products: mappedSupplier.products.map((product) => ({
            product_id: product.id,
            amount: 0,
          })),
        };
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };

    const fetchShopData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/shop");
        const shopData = response.data.data;
        setShops(shopData);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchSupplierData();
    fetchShopData();
  }, [id]);

  const handleIncrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
    updateFormData(productId, quantities[productId] + 1);
  };

  const handleDecrement = (productId) => {
    if (quantities[productId] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
      updateFormData(productId, quantities[productId] - 1);
    }
  };

  const updateFormData = (productId, amount) => {
    const updatedProducts = formData.products.map((product) => {
      if (product.product_id === productId) {
        return { ...product, amount };
      }
      return product;
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      shop_id: selectedShop.id,
      products: updatedProducts,
    }));
  };

  const handleOrder = async () => {
    if (!selectedShop) {
      console.error("Please select a shop before placing an order");
      return;
    }
  
    console.log(formData);
    try {
      const response = await axios.put(
        "http://localhost:4000/shop/stock",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Order placed", response.data);
  
      // Calculate the total debt
      const totalDebt = formData.products.reduce((total, product) => {
        const selectedProduct = supplier.products.find((p) => p.id === product.product_id);
        const productPrice = selectedProduct ? selectedProduct.price : 0;
        return total + product.amount * productPrice;
      }, 0);
      setTotalDebt(totalDebt);
  
      // Update the shop's balance
      const updatedShop = {
        ...selectedShop,
        balance: selectedShop.balance + totalDebt,
      };
      setShops((prevShops) =>
        prevShops.map((shop) => (shop.id === updatedShop.id ? updatedShop : shop))
      );
  
      // Reset quantities and total debt
      setQuantities(
        Object.fromEntries(Object.keys(quantities).map((key) => [key, 0]))
      );
      setTotalDebt(0);
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">
            {supplier.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mb-4">
                {selectedShop ? selectedShop.shop_name : "Select Shop"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {shops.map((shop) => (
                <DropdownMenuItem
                  key={shop.id}
                  onSelect={() => {
                    setSelectedShop(shop);
                  }}
                >
                  {shop.shop_name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/shop"> {/* Link to the /shop route */}
            <Button className="bg-black text-white ml-4">
              Go to Shop
            </Button>
          </Link>

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
