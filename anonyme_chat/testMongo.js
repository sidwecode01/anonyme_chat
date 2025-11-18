import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log("✅ MongoDB connecté avec succès !");
    process.exit(0);
  } catch (err) {
    console.error("❌ Impossible de se connecter à MongoDB :", err);
    process.exit(1);
  }
}

testConnection();
