module.exports = function requireSessionAuth(req, res, next) {
  if (!req.session?.auth) {
    return res.redirect("/");
  }

  next();
};

