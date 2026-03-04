const Catway = require("../models/catway");

/**
 * GET /catways
 * Récupérer tous les catways
 * Optionnel : filtrer par type (long/short) ou état (Disponible/Occupé)
 * Exemple : /catways?type=long&state=Disponible
 * Note : les paramètres de requête sont optionnels, on peut les utiliser séparément ou ensemble
 */
exports.getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.type) {
      filter.catwayType = req.query.type;
    }
    if (req.query.state) {
      filter.catwayState = req.query.state;
    }

    const catways = await Catway.find(filter);
    return res.status(200).json(catways);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST /catways
 * Créer un nouveau catway
 * Body : { catwayNumber, catwayType }
 * Note : catwayState est automatiquement défini à "Disponible" lors de la création
 */
exports.add = async (req, res, next) => {
  try {
    const { catwayNumber, catwayType } = req.body;
    const newCatway = new Catway({
      catwayNumber,
      catwayType,
      catwayState: "Disponible",
    });
    const savedCatway = await newCatway.save();
    return res.status(201).json(savedCatway);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /catways/:id
 * Mettre à jour l'état d'un catway (Disponible/Occupé)
 * Body : { catwayState }
 * Note : on ne peut pas mettre à jour le numéro ou le type du catway, uniquement son état
 */
exports.updateState = async (req, res, next) => {
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

/** DELETE /catways/:Number
 * Supprimer un catway par son numéro
 */
exports.delete = async (req, res, next) => {
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

/** GET /catways/:Number
 * Récupérer un catway par son numéro
 */
exports.getByNumber = async (req, res, next) => {
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
