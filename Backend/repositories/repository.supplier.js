const { Supplier } = require("../models/SupplierModel");

// Get all suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate("products");
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single supplier by ID
const getSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findOne().populate(
      "products"
    );
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new supplier
const addSupplier = async (req, res) => {
  const supplier = new Supplier(req.body);
  try {
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



module.exports = {
  getSuppliers,
  getSupplier,
  addSupplier,
};
