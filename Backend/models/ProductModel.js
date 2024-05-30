const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, unique: false },
    supplier: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
      },
    ],  
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
