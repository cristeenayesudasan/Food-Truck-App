const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const token = authHeader.split(" ")[1]; // Extract token if in "Bearer <token>" format

  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  try {
    console.log("Received Token:", token)
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User:", verified);
    // req.user = verified;
    req.user = { id: verified.userId, email: verified.email, roleId: verified.roleId };
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
