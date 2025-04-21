require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = require("./middleware/authMiddleware");
const stockRoutes = require("./routes/stock.routes");
const purchaseRoutes = require("./routes/purchase.routes");

const User = require("./models/User");
const Watchlist = require("./models/Watchlist");

const app = express();

// Allow CORS for both local dev and deployed frontend
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://moneo-frontend.vercel.app",
  "https://moneo.live",
  "https://www.moneo.live",
  "https://moneo.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.status(200).send("Moneo API is Running on Vercel!");
});

// AUTH ROUTES
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      token,
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { _id, name } = user;
    const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: { _id, name, email } });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/auth/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error });
  }
});

// Watchlist Routes
app.post("/api/watchlist", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { symbol } = req.body;

  try {
    let watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) watchlist = new Watchlist({ userId, symbols: [] });

    if (!watchlist.symbols.includes(symbol)) {
      watchlist.symbols.push(symbol);
      await watchlist.save();
    }

    res.json(watchlist.symbols);
  } catch (err) {
    res.status(500).json({ message: "Error updating watchlist" });
  }
});

app.delete("/api/watchlist/:symbol", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { symbol } = req.params;

  try {
    let watchlist = await Watchlist.findOne({ userId });
    if (watchlist) {
      watchlist.symbols = watchlist.symbols.filter((s) => s !== symbol);
      await watchlist.save();
    }

    res.json(watchlist.symbols);
  } catch (err) {
    res.status(500).json({ message: "Error removing from watchlist" });
  }
});

// External Routes
app.use("/api/stock", stockRoutes);
app.use("/api/purchase", purchaseRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
