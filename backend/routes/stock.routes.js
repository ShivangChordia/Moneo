const express = require("express");
const router = express.Router();
const axios = require("axios");
const verifyToken = require("../middleware/authMiddleware");

const EODHD_API_KEY = process.env.EODHD_API_KEY;

router.get("/:symbol", verifyToken, async (req, res) => {
  const { symbol } = req.params;
  const formattedSymbol = symbol.includes(".") ? symbol : `${symbol.toUpperCase()}.US`;

  const url = `https://eodhd.com/api/fundamentals/${formattedSymbol}?api_token=${EODHD_API_KEY}&fmt=json`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!data || !data.General || !data.Highlights) {
      return res.status(404).json({ message: `No data found for ${formattedSymbol}` });
    }

    const result = {
      symbol: data.General.Code,
      name: data.General.Name,
      currency: data.General.CurrencyCode,
      lastPrice: data.Highlights.Close || data.Highlights.PreviousClose || 0,
    };

    res.json(result);
  } catch (error) {
    console.error("❌ EODHD API error:", error.message);
    res.status(404).json({ message: `Failed to fetch data for ${formattedSymbol}` });
  }
});

module.exports = router;
