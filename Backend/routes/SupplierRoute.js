const express = require("express");
const supplierController = require("../repositories/repository.shop");
const router = express.Router();

router.get("", supplierController.getSuppliers);
router.get("/:id", supplierController.getSupplier);
router.post("", supplierController.addSupplier);
router.delete("/:id", supplierController.deleteSupplier)

module.exports = router;