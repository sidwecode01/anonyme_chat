"use server";

import dbConnect from "../../lib/dbConnect";

export async function createPost(formData) {
  const image_path = formData.get("image_path");
  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) {
    throw new Error("Le titre et le contenu ne peuvent pas être vides.");
  }

  try {
    const db = await dbConnect;

    await db
      .collection("posts")
      .insertOne({ image_path, title, content, createdAt: new Date() });

    return { success: true, message: "Publication créée avec succès." };
  } catch (error) {
    console.error("Erreur lors de la création de la publication :", error);
    throw new Error("Échec de la création de la publication en base de données.");
  }
}