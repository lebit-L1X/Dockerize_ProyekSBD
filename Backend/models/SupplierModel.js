const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: {type: String, required: false},
  owed: { type: Number, default: 0},
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }]

});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = {
  Supplier,
};
