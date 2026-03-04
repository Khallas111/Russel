const Catway = require("../models/catway");

/**
 * GET /api/catways
 * Récupérer tous les catways
 * Optionnel : filtrer par type ou état via query params
 * Exemple : /api/catways?catwayType=long&catwayState=Disponible
 */
exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.catwayType) filter.catwayType = req.query.catwayType;
    if (req.query.catwayState) filter.catwayState = req.query.catwayState;

    const catways = await Catway.find(filter);
    return res.status(200).json(catways);
  } catch (error) {
    if (error.name === "ValidationError" || error.code === 11000) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/catways
 * Créer un nouveau catway
 */
exports.add = async (req, res) => {
  try {
    const { catwayNumber, catwayType } = req.body;

    const existing = await Catway.findOne({ catwayNumber });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Ce numéro de catway existe déjà." });
    }

    const newCatway = new Catway({
      catwayNumber,
      catwayType,
      catwayState: "Disponible",
    });

    const savedCatway = await newCatway.save();
    return res.status(201).json(savedCatway);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/catways/:catwayNumber
 * Récupérer un catway par son numéro
 */
exports.getByNumber = async (req, res) => {
  try {
    const catway = await Catway.findOne({
      catwayNumber: req.params.catwayNumber,
    });
    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }
    return res.status(200).json(catway);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /api/catways/:catwayNumber
 * Mettre à jour l'état d'un catway
 */
exports.updateState = async (req, res) => {
  try {
    const { catwayState } = req.body;
    const updatedCatway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.catwayNumber },
      { catwayState },
      { new: true },
    );

    if (!updatedCatway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }
    return res.status(200).json(updatedCatway);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /api/catways/:catwayNumber
 * Supprimer un catway
 */
exports.delete = async (req, res) => {
  try {
    const deletedCatway = await Catway.findOneAndDelete({
      catwayNumber: req.params.catwayNumber,
    });

    if (!deletedCatway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }
    return res.status(200).json({ message: "Catway supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
