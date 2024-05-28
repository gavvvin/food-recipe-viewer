import { ObjectId } from "mongodb";
import { connectToDB } from "./connection";

export async function getRecipes(id?: string) {
  const db = await connectToDB();
  const recipesCollection = db.collection("recipes");

  if (id) {
    return recipesCollection.findOne({ _id: new ObjectId(id) });
  } else {
    return recipesCollection.find().toArray();
  }
}
