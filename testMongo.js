import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config(); // Charge .env.local

const MONGODB_URI = "mongodb+srv://Slase-Sidyellow-anonymous:SlaseSidyellowAnonymous@cluster0.dvlvvbg.mongodb.net/anonymous_chatapp?Name=Cluster0"
// const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(":( La variable MONGODB_URI n'est pas définie !");
  process.exit(1);
}

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
