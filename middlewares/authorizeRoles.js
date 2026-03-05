module.exports = function authorizeRoles(...allowedRoles) {
  return function (req, res, next) {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Acces refuse" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permissions insuffisantes" });
    }

    next();
  };
};

