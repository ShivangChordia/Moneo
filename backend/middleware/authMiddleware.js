// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.warn("🚫 No Authorization header present");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.warn("🚫 Token missing in Authorization header");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Log the received token for debugging
    console.log("🔑 Verifying token:", token);

    // Make sure JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined in .env file");
      return res.status(500).json({ message: "Internal server error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified. Payload:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
