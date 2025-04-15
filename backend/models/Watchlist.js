const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  symbols: [{ type: String }],
});

module.exports = mongoose.models.Watchlist || mongoose.model("Watchlist", watchlistSchema);
