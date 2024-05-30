const express = require("express");
const productController = require("../repositories/repository.product");
const router = express.Router();

//STARTS WITH /product
router.get("", productController.getProducts);
router.get("/:id", productController.getProductBySupplier);
router.post("", productController.addProduct);
router.delete("/:id", productController.deleteProduct)

module.exports = router;