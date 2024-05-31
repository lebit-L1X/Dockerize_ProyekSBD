const express = require("express");
const shopController = require("../repositories/repository.shop");
const router = express.Router();

router.get("/", shopController.getAllShops);
router.post("/", shopController.addShop);
router.put("/stock", shopController.updateStock);
router.put("/balance", shopController.addBalance);

module.exports = router;
