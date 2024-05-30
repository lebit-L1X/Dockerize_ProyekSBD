const { Shop } = require("../models/ShopModel");

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
  try {
    const shop = await Shop.findOneAndUpdate(
      { "products._id": req.body.productId },
      { $set: { "products.$.stock": req.body.stock } },
      { new: true }
    );
    if (!shop) {
      return res.status(404).json({ message: "Shop or Product not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update shop balance
const updateBal = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.body.shopId,
      { $set: { balance: req.body.balance } },
      { new: true }
    );
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addShop,
  updateStock,
  updateBal,
};