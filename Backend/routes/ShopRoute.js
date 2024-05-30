const express = require("express");
const shopController = require("../repositories/repository.shop");
const router = express.Router();


router.post("", shopController.addShop);
router.put("/product/stock", shopController.updateStock)
router.put("/balance", shopController.updateBal)

module.exports = router;