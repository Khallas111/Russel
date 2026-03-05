const express = require("express");
const requireSessionAdmin = require("../middlewares/requireSessionAdmin");

const router = express.Router();

router.get("/", requireSessionAdmin, (req, res) => {
  res.render("users", {
    title: "CRUD Utilisateurs",
    token: req.session.auth.token,
    user: req.session.auth.user,
  });
});

module.exports = router;
