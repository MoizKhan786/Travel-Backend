const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.SECRET
    );

    if (Date.now() > decoded.exp) {
      return res.status(401).json({ error: "Token expired" });
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = requireAuth;
