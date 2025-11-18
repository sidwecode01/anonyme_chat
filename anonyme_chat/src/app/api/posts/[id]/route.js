"use server";

import { ObjectId } from "mongodb";
import dbConnect from "../../lib/dbConnect";

export async function updatePost(id, formData) {
  const image_path = formData.get("image_path");
  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) {
    throw new Error("Le titre et le contenu ne peuvent pas être vides pour la mise à jour.");
  }

  if (!ObjectId.isValid(id)) {
    throw new Error("L'identifiant fourni est invalide.");
  }

  try {
    const db = await dbConnect;
    const postObjectId = new ObjectId(id);

    const result = await db.collection("posts").updateOne(
      { _id: postObjectId },
      { $set: { image_path, title, content, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      throw new Error("Aucune publication trouvée avec cet ID. La mise à jour a échoué.");
    }

    return { success: true, message: `Publication ID ${id} mise à jour.`, modifiedCount: result.modifiedCount };

  } catch (error) {
    console.error(`Erreur serveur lors de la mise à jour de la publication ${id}:`, error);
    throw new Error(error.message || "Échec de la mise à jour de la publication en base de données.");
  }
}

export async function deletePost(id) {
  if (!ObjectId.isValid(id)) {
    throw new Error("L'identifiant fourni est invalide.");
  }

  try {
    const db = await dbConnect;
    const postObjectId = new ObjectId(id);

    const result = await db.collection("posts").deleteOne({ _id: postObjectId });

    if (result.deletedCount === 0) {
      throw new Error("Aucune publication trouvée avec cet ID. La suppression a échoué.");
    }

    return { success: true, message: `Publication ID ${id} supprimée avec succès.` };

  } catch (error) {
    console.error(`Erreur serveur lors de la suppression de la publication ${id}:`, error);
    throw new Error(error.message || "Échec de la suppression de la publication en base de données.");
  }
}