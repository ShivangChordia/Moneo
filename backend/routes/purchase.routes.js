const express = require("express");
const router = express.Router();
const Purchase = require("../models/purchase.model");
const verifyToken = require("../middleware/authMiddleware");

// POST: Simulate buying a stock
router.post("/api/purchase", verifyToken, async (req, res) => {
  const { symbol, quantity, priceAtPurchase } = req.body;
  try {
    const purchase = new Purchase({
      userId: req.user.id,
      symbol,
      quantity,
      priceAtPurchase,
    });
    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: "Purchase failed", error });
  }
});

// GET: All user's purchases
router.get("/api/purchase", verifyToken, async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user.id });
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch purchases", error });
  }
});

// DELETE: Simulate selling/removing purchase
router.delete("/api/purchase/:id", verifyToken, async (req, res) => {
  try {
    await Purchase.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Purchase deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
});

module.exports = router;
