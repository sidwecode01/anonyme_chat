// app/api/comments/route.js
import { NextResponse } from "next/server";
import posts from "../../../../model/posts";
import comments from "../../../../model/comments";
import dbConnect from "../../../../lib/dbConnect";

export async function POST(req, context) {
  try {
    await dbConnect();

    const { id } = await context.params;
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { erreur: "Le champ 'content' est obligatoire." },
        { status: 400 }
      );
    }

    // Vérification de l'existence du post
    const existingPost = await posts.findById(id);
    if (!existingPost) {
      return NextResponse.json(
        { erreur: "Le post spécifié est introuvable." },
        { status: 404 }
      );
    }

    // Création du commentaire
    const comment = await comments.create({
      post: id,
      content,
    });

    return NextResponse.json(
      {
        message: "Commentaire ajouté avec succès.",
        commentaire: comment,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        erreur: "Erreur interne du serveur.",
        details: err.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req, context) {
  try {
    await dbConnect();

     const { id } = await context.params;

    // Vérifie si le post existe
    const existingPost = await posts.findById(id);
    if (!existingPost) {
      return NextResponse.json(
        { erreur: "Le post spécifié est introuvable." },
        { status: 404 }
      );
    }

    // Récupération des commentaires
    const commentaires = await comments
      .find({ post: id })
      .sort({ createdAt: -1 });

    return NextResponse.json(commentaires , { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        erreur: "Erreur interne du serveur.",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
