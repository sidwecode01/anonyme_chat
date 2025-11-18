"use server";

import dbConnect from "../../lib/dbConnect";
import posts from "../../model/posts";

export const GET = async () => {
  await dbConnect();
  const AllPosts = await posts.find();
  console.log("get comment");
  return new Response(JSON.stringify(AllPosts), { status: 200 });
};

export async function POST(request) {
  const data = await request.json();
  // const image_path = formData.get("image_path");
  // const title = formData.get("title");
  // const content = formData.get("content");

  if (!data.title || !data.content) {
    throw new Error("Le titre et le contenu ne peuvent pas être vides.");
  }

  await dbConnect;
  try {
    const newPost = await posts.create(data);
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de la publication :", error);
    throw new Error(
      "Échec de la création de la publication en base de données."
    );
  }
}
