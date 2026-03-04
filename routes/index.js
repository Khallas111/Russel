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
  res.render("index", { title: "Express" });
});

module.exports = router;
