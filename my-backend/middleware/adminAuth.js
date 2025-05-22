const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check for 'admin' role in the decoded token
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Not an admin" });
    }

    req.user = decoded;
    next();  // Proceed to the next middleware/route handler
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    console.error("JWT Error:", err);  // Log the error for debugging
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminAuth;
