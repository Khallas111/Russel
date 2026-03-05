require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");

async function run() {
  const email = process.argv[2];

  if (!email) {
    console.error("Usage: node scripts/promote-admin.js <email>");
    process.exit(1);
  }

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI manquant dans .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await User.findOneAndUpdate(
    { email: normalizedEmail },
    { role: "admin" },
    { new: true },
  ).select("email username role");

  if (!user) {
    console.error(`Utilisateur introuvable: ${normalizedEmail}`);
    await mongoose.disconnect();
    process.exit(1);
  }

  console.log(`Utilisateur promu admin: ${user.email}`);
  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error(error.message);
  try {
    await mongoose.disconnect();
  } catch {
    // no-op
  }
  process.exit(1);
});

