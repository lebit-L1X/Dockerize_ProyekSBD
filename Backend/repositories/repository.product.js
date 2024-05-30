const { Product } = require("../models/ProductModel");
const { Shop } = require("../models/ShopModel");
const { Supplier } = require("../models/SupplierModel");

exports.getProducts = async function (req, res) {
  try {
    let result;
    result = await Product.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Successfully get products",
        data: result,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getProductBySupplier = async function (req, res) {
  try {
    const { supplierId } = req.params;
    const products = await Product.find({ supplier: supplierId }).populate(
      "supplier"
    );
    if (products.length === 0) {
      return res.status(404).send("No products found for the given supplier");
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Successfully retrieved products",
        data: products,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.addProduct = async function (req, res) {
  try {
    const { id, name, price, supplierid } = req.body;

    if (!id || !name || !price || !supplierid) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    let supplier;
    if (!await Supplier.exists({ id: supplierid })) {
        return res.status(400).json({ success: false, message: "Supplier not found" });
      }
    else{
        supplier = await Supplier.findOne({id:supplierid});
    }

    const newProduct = new Product({
      id,
      name,
      price,
      supplier,
    });

    await newProduct.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Product added successfully",
        data: newProduct,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteProduct = async function (req, res) {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await product.remove();

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
