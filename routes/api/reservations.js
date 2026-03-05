const express = require("express");
// { mergeParams: true } pour récupérer catwayNumber depuis /api/catways/:catwayNumber
const router = express.Router({ mergeParams: true });
const reservationsController = require("../../controllers/reservations");

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /api/catways/{catwayNumber}/reservations:
 *   get:
 *     summary: Lister toutes les réservations d'un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Liste des réservations
 *       404:
 *         description: Catway ou réservations non trouvés
 *       500:
 *         description: Erreur serveur
 */
router.get("/", reservationsController.getAllForCatway);

/**
 * @swagger
 * /api/catways/{catwayNumber}/reservations/{idReservation}:
 *   get:
 *     summary: Récupérer une réservation par son ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la réservation
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get("/:idReservation", reservationsController.getById);

/**
 * @swagger
 * /api/catways/{catwayNumber}/reservations:
 *   post:
 *     summary: Créer une réservation pour un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientName: "Ralph Laurent"
 *             boatName: "Surcouf"
 *             startDate: "2024-07-01"
 *             endDate: "2024-07-10"
 *     responses:
 *       201:
 *         description: Réservation créée
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur
 */
router.post("/", reservationsController.add);

/**
 * @swagger
 * /api/catways/{catwayNumber}/reservations/{idReservation}:
 *   put:
 *     summary: Mettre à jour une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientName: "Ralph L."
 *             boatName: "Surcouf II"
 *             startDate: "2024-07-02"
 *             endDate: "2024-07-12"
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put("/:idReservation", reservationsController.update);

/**
 * @swagger
 * /api/catways/{catwayNumber}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:idReservation", reservationsController.delete);

module.exports = router;
