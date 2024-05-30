const express = require("express");
const shopController = require("../repositories/repository.shop");
const router = express.Router();


router.post("/shop", shopController.addShop);
router.put("shop/product/stock", shopController.updateStock)
router.put("shop/balance", shopController.updateBal)

module.exports = shopRouter;