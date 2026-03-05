const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email et mot de passe requis" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email deja utilise" });
    }

    const user = await User.create({
      username: String(username).trim(),
      email: normalizedEmail,
      password,
      role: "standard",
    });

    return res.status(201).json({
      message: "Utilisateur cree",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email deja utilise" });
    }
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET manquant" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Identifiants invalides" });
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

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role || "standard",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
