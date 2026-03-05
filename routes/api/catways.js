const express = require("express");
const router = express.Router();
const catwaysController = require("../../controllers/catways");
const auth = require("../../middlewares/auth");
const authorizeRoles = require("../../middlewares/authorizeRoles");
/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways
 */

/**
 * @swagger
 * /api/catways:
 *   get:
 *     summary: Récupérer tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways
 *         content:
 *           application/json:
 *             example:
 *               - _id: "65f123abc456"
 *                 catwayNumber: 1
 *                 catwayType: "long"
 *                 catwayState: "Disponible"
 *       500:
 *         description: Erreur serveur
 */
router.get("/", auth, catwaysController.getAll);

/**
 * @swagger
 * /api/catways:
 *   post:
 *     summary: Créer un nouveau catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             catwayNumber: 2
 *             catwayType: "short"
 *     responses:
 *       201:
 *         description: Catway créé
 *         content:
 *           application/json:
 *             example:
 *               _id: "65f123abc457"
 *               catwayNumber: 2
 *               catwayType: "short"
 *               catwayState: "Disponible"
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur
 */
router.post("/", auth, authorizeRoles("admin"), catwaysController.add);

/**
 * @swagger
 * /api/catways/{catwayNumber}:
 *   get:
 *     summary: Récupérer un catway par son numéro
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:catwayNumber", auth, catwaysController.getByNumber);

/**
 * @swagger
 * /api/catways/{catwayNumber}:
 *   put:
 *     summary: Mettre à jour l'état d'un catway (Disponible/Occupé)
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             catwayState: "Occupé"
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put(
  "/:catwayNumber",
  auth,
  authorizeRoles("admin"),
  catwaysController.updateState,
);

/**
 * @swagger
 * /api/catways/{catwayNumber}:
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete(
  "/:catwayNumber",
  auth,
  authorizeRoles("admin"),
  catwaysController.delete,
);

module.exports = router;
