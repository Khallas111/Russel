const Reservation = require("../models/reservation");
const Catway = require("../models/catway");

/**
 * GET /catways/:id/reservations
 * Récupérer toutes les réservations pour un catway donné
 */
exports.getAllForCatway = async (req, res) => {
  try {
    const catwayNumber = parseInt(req.params.id, 10);

    const reservations = await Reservation.find({ catwayNumber });
    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET /catways/:id/reservations/:reservationId
 * Récupérer une réservation spécifique pour un catway
 */
exports.getById = async (req, res) => {
  try {
    const { id: catwayNumber, reservationId } = req.params;

    const reservation = await Reservation.findOne({
      _id: reservationId,
      catwayNumber,
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST /catways/:id/reservations
 * Créer une réservation pour un catway donné
 */
exports.add = async (req, res) => {
  try {
    const catwayNumber = parseInt(req.params.id, 10);
    const { clientName, boatName, startDate, endDate } = req.body;

    // Vérifier que le catway existe
    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }

    const reservation = await Reservation.create({
      catwayNumber,
      clientName,
      boatName,
      startDate,
      endDate,
    });

    return res.status(201).json(reservation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /catways/:id/reservations/:reservationId
 * Mettre à jour une réservation existante
 */
exports.update = async (req, res) => {
  try {
    const { id: catwayNumber, reservationId } = req.params;
    const updates = req.body;

    const reservation = await Reservation.findOneAndUpdate(
      { _id: reservationId, catwayNumber },
      updates,
      { new: true },
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /catways/:id/reservations/:reservationId
 * Supprimer une réservation
 */
exports.delete = async (req, res) => {
  try {
    const { id: catwayNumber, reservationId } = req.params;

    const reservation = await Reservation.findOneAndDelete({
      _id: reservationId,
      catwayNumber,
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    return res.status(200).json({ message: "Réservation supprimée" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
