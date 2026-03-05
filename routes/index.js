var express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Index
 *   description: Pages publiques du site
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Affiche la page d'accueil
 *     tags: [Index]
 *     responses:
 *       200:
 *         description: Page HTML générée via moteur de templates
 */
/* GET home page. */
router.get("/", function (req, res) {
  if (req.session?.auth) {
    return res.redirect("/dashboard");
  }

  res.status(200).render("home", {
    title: "Russel API",
    error: null,
  });
});

router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("home", {
        title: "Russel API",
        error: "Email et mot de passe requis.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).render("home", {
        title: "Russel API",
        error: "Configuration JWT manquante.",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).render("home", {
        title: "Russel API",
        error: "Identifiants invalides.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).render("home", {
        title: "Russel API",
        error: "Identifiants invalides.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role || "standard",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    req.session.auth = {
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role || "standard",
      },
    };

    return res.redirect("/dashboard");
  } catch (error) {
    return res.status(500).render("home", {
      title: "Russel API",
      error: "Erreur interne lors de la connexion.",
    });
  }
});

router.get("/dashboard", function (req, res) {
  if (!req.session?.auth) {
    return res.redirect("/");
  }

  return res.status(200).render("dashboard", {
    title: "Tableau de bord",
    user: req.session.auth.user,
  });
});

router.post("/logout", function (req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
