const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users");
const auth = require("../../middlewares/auth");
const authorizeRoles = require("../../middlewares/authorizeRoles");
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             example:
 *               - _id: "65f123abc456"
 *                 name: "John Doe"
 *                 email: "john@mail.com"
 */
// GET /users → liste de tous les utilisateurs (sans password)
router.get("/", auth, authorizeRoles("admin"), usersController.getAll);

// GET /users/me → profil utilisateur connecté
router.get("/me", auth, usersController.getMe);

/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     summary: Récupérer un utilisateur par son email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
// GET /users/:email → récupérer un utilisateur par email
router.get("/:email", auth, authorizeRoles("admin"), usersController.getByEmail);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Jane Doe"
 *             email: "jane@mail.com"
 *             password: "123456"
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       500:
 *         description: Erreur serveur
 */
// POST /users → créer un nouvel utilisateur
router.post("/", auth, authorizeRoles("admin"), usersController.add);

/**
 * @swagger
 * /api/users/{email}:
 *   put:
 *     summary: Mettre à jour un utilisateur (username ou password uniquement)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email de l'utilisateur à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "Jane Smith"
 *             password: "newpassword123"
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
// PUT /users/:email → mettre à jour username et/ou password
router.put("/:email", auth, authorizeRoles("admin"), usersController.update);

/**
 * @swagger
 * /api/users/{email}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
// DELETE /users/:email → supprimer un utilisateur
router.delete("/:email", auth, authorizeRoles("admin"), usersController.delete);

module.exports = router;
