module.exports = function requireSessionAdmin(req, res, next) {
  if (!req.session?.auth) {
    return res.redirect("/");
  }

  if (req.session.auth.user?.role !== "admin") {
    return res.status(403).render("forbidden", {
      title: "Acces refuse",
      user: req.session.auth.user,
    });
  }

  next();
};

