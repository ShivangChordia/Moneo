const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  priceAtPurchase: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;