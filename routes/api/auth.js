const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification et inscription
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscrire un utilisateur standard
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "alice"
 *             email: "alice@mail.com"
 *             password: "secret123"
 *     responses:
 *       201:
 *         description: Utilisateur cree
 *       400:
 *         description: Donnees invalides
 *       409:
 *         description: Email deja utilise
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connecter un utilisateur et obtenir un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "alice@mail.com"
 *             password: "secret123"
 *     responses:
 *       200:
 *         description: Connexion reussie
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: "67f123abc456"
 *                 username: "alice"
 *                 email: "alice@mail.com"
 *                 role: "standard"
 *       400:
 *         description: Email/mot de passe manquants
 *       401:
 *         description: Identifiants invalides
 */
router.post("/login", authController.login);

module.exports = router;
