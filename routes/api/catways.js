const express = require("express");
const router = express.Router();
const catwaysController = require("../../controllers/catways");

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
router.get("/", catwaysController.getAll);

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
router.post("/", catwaysController.add);

/**
 * @swagger
 * /api/catways/{id}:
 *   get:
 *     summary: Récupérer un catway par son ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", catwaysController.getById);

/**
 * @swagger
 * /api/catways/{id}:
 *   put:
 *     summary: Mettre à jour l'état d'un catway (Disponible/Occupé)
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway
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
router.put("/:id", catwaysController.updateState);

/**
 * @swagger
 * /api/catways/{id}:
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway à supprimer
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", catwaysController.delete);

module.exports = router;
