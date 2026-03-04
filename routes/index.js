var express = require("express");
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Index
 *   description: Pages publiques du site
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Affiche la page d'accueil
 *     tags: [Index]
 *     responses:
 *       200:
 *         description: Page HTML générée via moteur de templates
 */
/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    name: "API",
    version: "1.0",
    status: 200,
    message: "API Russel en ligne",
  });
});

module.exports = router;
