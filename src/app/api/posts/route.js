"use server";

import dbConnect from "../../lib/dbConnect";
import posts from "../../model/posts";

export const GET = async () => {
  try {
    await dbConnect();
    const allPosts = await posts.find();
    return new Response(JSON.stringify(allPosts), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des posts :", error);
    return new Response(
      JSON.stringify({ erreur: "Impossible de récupérer les publications.", details: error.message }),
      { status: 500 }
    );
  }
};

export default async function POST(request) {
  const data = await request.json();
  // const image_path = formData.get("image_path");
  // const title = formData.get("title");
  // const content = formData.get("content");

  if (!data.title || !data.content) {
    throw new Error("Le titre et le contenu ne peuvent pas être vides.");
  }

  await dbConnect();
  try {
    const data = await request.json();

    if (!data.title || !data.content) {
      return new Response(
        JSON.stringify({ erreur: "Le titre et le contenu ne peuvent pas être vides." }),
        { status: 400 }
      );
    }

    await dbConnect();
    const newPost = await posts.create(data);

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de la publication :", error);

    let message = "Échec de la création de la publication en base de données.";

    // Si c’est une erreur de JSON (request.body vide ou invalide)
    if (error instanceof SyntaxError) {
      message = "Le corps de la requête n'est pas un JSON valide.";
      return new Response(JSON.stringify({ erreur: message }), { status: 400 });
    }

    return new Response(JSON.stringify({ erreur: message, details: error.message }), { status: 500 });
  }
}
