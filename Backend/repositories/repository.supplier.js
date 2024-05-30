const { Supplier } = require("../models/SupplierModel");
const { Product } = require("../models/ProductModel");

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
    const supplier = await Supplier.findById(req.params.id).populate(
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
    try {
      const { id, name, description, productid } = req.body;
  
      if (!id || !name || !productid) {
        return res.status(400).json({ success: false, message: "ID, name, and products are required" });
      }

    let products;
    if(!await Product.exists({id: productid})){
        return res.status(400).json({ success: false, message: "Supplier not found" });
    } 
    else {
        products = await Product.findOne({id: productid});
    }
  
    const newSupplier = new Supplier({ id, name, description, products });
    await newSupplier.save();
  
      res.status(201).json({ success: true, message: "Supplier added successfully", data: newSupplier });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

// Update a supplier
const updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a supplier
const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json({ message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSuppliers,
  getSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};
