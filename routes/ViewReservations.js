const express = require("express");
const requireSessionAuth = require("../middlewares/requireSessionAuth");

const router = express.Router();

router.get("/", requireSessionAuth, (req, res) => {
  res.render("reservations", {
    title: "CRUD Reservations",
    token: req.session.auth.token,
    user: req.session.auth.user,
    isAdmin: req.session.auth.user?.role === "admin",
  });
});

module.exports = router;
