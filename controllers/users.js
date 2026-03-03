const User = require("../models/user");

/**
 * GET /users
 * Récupérer tous les utilisateurs
 */
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET /users/:email
 * Récupérer un utilisateur par email
 */
exports.getByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password",
    );

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST /users
 * Créer un nouvel utilisateur
 */
exports.add = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json(userResponse);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /users/:email
 * Mettre à jour un utilisateur (username ou password uniquement)
 */
exports.update = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (req.body.username) {
      user.username = req.body.username;
    }

    if (req.body.password) {
      user.password = req.body.password; // sera hashé par le pre("save")
    }

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json(userResponse);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /users/:email
 * Supprimer un utilisateur
 */
exports.delete = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      email: req.params.email,
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    return res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
