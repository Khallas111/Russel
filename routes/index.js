var express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Reservation = require("../models/reservation");
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Index
 *   description: Pages web publiques et privees de l'application
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Affiche la page d'accueil avec formulaire de connexion
 *     tags: [Index]
 *     responses:
 *       200:
 *         description: Page HTML d'accueil
 *       302:
 *         description: Redirection vers /dashboard si l'utilisateur est deja connecte
 */
router.get("/", function (req, res) {
  if (req.session?.auth) {
    return res.redirect("/dashboard");
  }

  res.status(200).render("home", {
    title: "Russel API",
    error: null,
  });
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecte un utilisateur via formulaire puis redirige vers le tableau de bord
 *     tags: [Index]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirection vers /dashboard en cas de succes
 *       400:
 *         description: Email ou mot de passe manquant
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur interne ou configuration JWT manquante
 */
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

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Affiche le tableau de bord de l'utilisateur connecte
 *     tags: [Index]
 *     responses:
 *       200:
 *         description: Page HTML du tableau de bord
 *       302:
 *         description: Redirection vers / si l'utilisateur n'est pas connecte
 *       500:
 *         description: Erreur lors du chargement des reservations en cours
 */
router.get("/dashboard", async function (req, res) {
  if (!req.session?.auth) {
    return res.redirect("/");
  }

  const today = new Date();

  try {
    const reservationsInProgress = await Reservation.find({
      startDate: { $lte: today },
      endDate: { $gte: today },
    })
      .sort({ startDate: 1 })
      .lean();

    return res.status(200).render("dashboard", {
      title: "Tableau de bord",
      user: req.session.auth.user,
      currentDate: today.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      reservationsInProgress,
      dashboardError: null,
    });
  } catch (error) {
    return res.status(500).render("dashboard", {
      title: "Tableau de bord",
      user: req.session.auth.user,
      currentDate: today.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      reservationsInProgress: [],
      dashboardError: "Impossible de charger les reservations en cours.",
    });
  }
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Deconnecte l'utilisateur courant et redirige vers l'accueil
 *     tags: [Index]
 *     responses:
 *       302:
 *         description: Redirection vers /
 */
router.post("/logout", function (req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
