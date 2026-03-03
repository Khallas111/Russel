const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

// GET /users → liste de tous les utilisateurs (sans password)
router.get("/", usersController.getAll);

// GET /users/:email → récupérer un utilisateur par email
router.get("/:email", usersController.getByEmail);

// POST /users → créer un nouvel utilisateur
router.post("/", usersController.add);

// PUT /users/:email → mettre à jour username et/ou password
router.put("/:email", usersController.update);

// DELETE /users/:email → supprimer un utilisateur
router.delete("/:email", usersController.delete);

module.exports = router;
