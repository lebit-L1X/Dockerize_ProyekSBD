const { Shop } = require("../models/ShopModel");
const { Product } = require("../models/ProductModel");
const { Supplier } = require("../models/SupplierModel");

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
  const { shop_id, products } = req.body;

  if (!shop_id || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Shop ID and an array of products are required",
    });
  }

  try {
    const shop = await Shop.findOne({ id: shop_id });
    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    for (const item of products) {
      const { product_id, amount } = item;
      if (!product_id || !amount) {
        return res.status(400).json({
          success: false,
          message: "Each product must have 'product_id' and 'amount'",
        });
      }

      const product = await Product.findOne({ id: product_id });
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found for id: ${product_id}` });
      }

      const productIdStr = product._id.toString();
      const unpaidProduct = shop.products.find(
        (p) => p.product.toString() === productIdStr && !p.paid
      );

      if (unpaidProduct) {
        unpaidProduct.stock += parseInt(amount, 10);
      } else {
        shop.products.push({
          product: product._id,
          stock: parseInt(amount, 10),
          sell_price: product.price,
          paid: false  
        });
      }

      const supplier = await Supplier.findById(product.supplier);
      if (!supplier) {
        return res.status(404).json({ success: false, message: `Supplier not found for product id: ${product_id}` });
      }

      supplier.owed += product.price * parseInt(amount, 10);
      await supplier.save();
    }

    await shop.save();

    res.status(200).json({
      success: true,
      message: "Stock updated successfully and owed amount updated",
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
    res
      .status(200)
      .json({
        success: true,
        message: "Balance updated successfully",
        data: shop,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Shops retrieved successfully",
        data: shops,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const payItems = async (req, res) => {
  const { shop_id, product_id } = req.body;

  try {
    const shop = await Shop.findOne({ id: shop_id }).populate("products.product");
    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    const productsInShop = shop.products.filter((p) => p.product.id === product_id);
    if (productsInShop.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found in shop" });
    }

    let totalCost = 0;
    productsInShop.forEach((productInShop) => {
      if (!productInShop.paid) {
        totalCost += productInShop.product.price * productInShop.stock;
      }
    });

    if (totalCost === 0) {
      return res.status(400).json({ success: false, message: "All products already paid for" });
    }

    if (shop.balance < totalCost) {
      return res.status(400).json({ success: false, message: "Insufficient balance" });
    }

    const supplier = await Supplier.findById(productsInShop[0].product.supplier);
    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    shop.balance -= totalCost;
    productsInShop.forEach((productInShop) => {
      if (!productInShop.paid) {
        productInShop.paid = true;
      }
    });
    supplier.owed -= totalCost;

    await shop.save();
    await supplier.save();

    res.status(200).json({ success: true, message: "Items paid successfully", data: shop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const purchaseItems = async (req, res) => {
  const { shop_id, product_id, amount } = req.body;

  if (!shop_id || !product_id || !amount) {
    return res.status(400).json({
      success: false,
      message: "All fields are required and 'amount' must be a number",
    });
  }

  try {
    const shop = await Shop.findOne({ id: shop_id }).populate(
      "products.product"
    );
    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    const productInShop = shop.products.find(
      (p) => p.product.id === product_id
    );
    if (!productInShop) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in shop" });
    }

    if (productInShop.stock < amount) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient stock" });
    }

    const totalRevenue = productInShop.sell_price * amount;

    productInShop.stock -= amount;
    shop.balance += totalRevenue;

    await shop.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Items purchased successfully",
        data: shop,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeSellPrice = async (req, res) => {
  const { shop_id, product_id, new_price } = req.body;

  if (!shop_id || !product_id || new_price === undefined || new_price < 0) {
    return res.status(400).json({
      success: false,
      message:
        "All fields are required and 'new_price' must be a non-negative number",
    });
  }

  try {
    const shop = await Shop.findOne({ id: shop_id }).populate(
      "products.product"
    );
    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    const productInShop = shop.products.find(
      (p) => p.product.id === product_id
    );
    if (!productInShop) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in shop" });
    }

    productInShop.sell_price = new_price;

    await shop.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Sell price updated successfully",
        data: shop,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addShop,
  getAllShops,
  addBalance,
  updateStock,
  payItems,
  purchaseItems,
  changeSellPrice,
};
