const express = require("express");
const productController = require("../repositories/repository.product");
const router = express.Router();

//STARTS WITH /product
router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getProduct);
router.post("/product", productController.addProduct);
router.put("/product/:id", productController.updateProduct)
router.delete("/product/:id", productController.deleteProduct)

module.exports = productRouter;
