const { Shop } = require("../models/ShopModel");
const { Product } = require("../models/ProductModel");

// Add a new shop
const addShop = async (req, res) => {
  const shop = new Shop(req.body);
  try {
    const newShop = await shop.save();
    res.status(201).json(newShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product stock in a shop

const updateStock = async (req, res) => {
  const { shop_id, product_id, amount } = req.body;

  if (!shop_id || !product_id || !amount) {
    return res
      .status(400)
      .json({
        success: false,
        message: "All fields are required and 'amount' must be a number",
      });
  }

  try {
    const shop = await Shop.findOne({ id: shop_id });
    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    const product = await Product.findOne({ id: product_id });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const productIdStr = product._id.toString();
    const productIndex = shop.products.findIndex(
      (p) => p.product.toString() === productIdStr
    );

    if (productIndex === -1) {
      console.log("Product not found, creating");
      shop.products.push({
        product: product._id,
        stock: amount,
      });
    } else {
      shop.products[productIndex].stock =
        parseInt(shop.products[productIndex].stock, 10) + parseInt(amount, 10);
    }

    await shop.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Stock updated successfully",
        data: shop,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Update shop balance
const addBalance = async (req, res) => {
  try {
    const { shop_id, amount } = req.body;

    const shop = await Shop.findOne({ id: shop_id });
    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }
    const amountInt = parseInt(amount, 10);
    shop.balance += amountInt;
    await shop.save();
    res.status(200).json({ success: true, message: "Balance updated successfully", data: shop });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json({ success: true, message: "Shops retrieved successfully", data: shops });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addShop,
  getAllShops, 
  addBalance,
  updateStock,
};
