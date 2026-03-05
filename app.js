require("dotenv").config();
const { initClientDbConnection } = require("./db/mongo");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/users");
const catwaysRouter = require("./routes/api/catways");
const reservationsRouter = require("./routes/api/reservations");
var app = express();

initClientDbConnection().catch((error) => {
  console.error("Impossible d'initialiser la connexion MongoDB:", error.message);
  process.exit(1);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// Routes Catways
app.use("/api/catways", catwaysRouter);

// Routes Réservations (imbriquées dans Catways)
// Exemple : GET /api/catways/123/reservations pour lister les réservations du catway 123
app.use("/api/catways/:catwayNumber/reservations", reservationsRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware pour gérer les routes non trouvées (404)

app.use(function (req, res, next) {
  res.status(404).json({
    name: "API",
    version: "1.0",
    status: 404,
    message: "not found",
  });
});

module.exports = app;
