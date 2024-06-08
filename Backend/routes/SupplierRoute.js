const express = require("express");
const supplierController = require("../repositories/repository.supplier");
const router = express.Router();

router.get("", supplierController.getSuppliers);
router.get("/:id", supplierController.getSupplier);
router.post("", supplierController.addSupplier);

module.exports = router;
