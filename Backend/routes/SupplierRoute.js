const express = require("express");
const supplierController = require("../repositories/repository.supplier");
const router = express.Router();

router.get("/suppliers", supplierController.getSuppliers);
router.get("/supplier/:id", supplierController.getSupplier);
router.post("/supplier", supplierController.addSupplier);
router.put("/supplier/:id", supplierController.updateSupplier)
router.delete("/supplier/:id", supplierController.deleteSupplier)

module.exports = supplierRouter;