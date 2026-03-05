const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET manquant" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Format Authorization invalide" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      ...decoded,
      role: decoded.role || "standard",
    };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expire" });
    }
    return res.status(403).json({ message: "Token invalide" });
  }
};
