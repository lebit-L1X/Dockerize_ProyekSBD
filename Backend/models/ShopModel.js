const mongoose = require("mongoose");

const shopProductSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    paid: { type: Boolean, default: false },
    stock: {type: Number, default: 1},
  },
  { timestamps: true }
);

const shopSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    shop_name: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, default: 0 },
    products: [shopProductSchema],
  },
);

const Shop = mongoose.model("Shop", shopSchema);

module.exports = {
  Shop,
};
