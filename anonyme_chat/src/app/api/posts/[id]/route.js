import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";
import posts from "../../../model/posts";
// import posts from "../../../model/posts";


export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const data = await req.json();
    const { image_path, title, content } = data;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Le titre et le contenu ne peuvent pas être vides." },
        { status: 400 }
      );
    }

    await dbConnect();

    const updateData = {
      title: title.trim(),
      content: content.trim(),
      updatedAt: new Date(),
    };

    if (image_path) {
      updateData.image_path = image_path;
    }

    const updated = await posts.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Aucune publication trouvée avec cet ID." },
        { status: 404 }
      );
    }

    console.log(`Publication mise à jour avec succès - ID: ${id}`);

    return NextResponse.json(
      {
        success: true,
        message: "Publication mise à jour avec succès",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la publication:", {
      error: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: "Erreur lors de la mise à jour de la publication",
        ...(process.env.NODE_ENV === "development" && {
          detail: error.message,
        }),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    
    await dbConnect();
    const deleted = await posts.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ error: "Publication non trouvée" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Publication supprimée" });
  } catch (error) {
    console.error("Erreur suppression:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}