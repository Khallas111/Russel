const mongoose = require("mongoose");

const CatwaySchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, "Le numéro est requis"],
      unique: true,
      min: [1, "Le numéro doit être supérieur à 0"],
    },
    catwayType: {
      type: String,
      required: [true, "Le type est requis"],
      enum: ["long", "short"],
    },
    catwayState: {
      type: String,
      required: true,
      default: "Disponible",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Catway", CatwaySchema);
