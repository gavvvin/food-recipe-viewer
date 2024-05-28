import { ObjectId } from "mongodb";
import { connectToDB } from "./connection";
import { Recipe, Review } from "../types/recipe.types";

export const getRecipes = async (id?: string) => {
  try {
    const db = await connectToDB();
    const recipesCollection = db.collection("recipes");

    if (id) {
      return recipesCollection.findOne({ _id: new ObjectId(id) });
    } else {
      return recipesCollection.find().toArray();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createRecipe = async ({
  author,
  title,
  subtitle,
  image,
  cookingTimeInMins,
  ingredients,
  instructions,
  dietTypes,
}: Recipe) => {
  try {
    if (!title) throw Error("Title cannot be empty");

    const db = await connectToDB();
    const recipesCollection = db.collection("recipes");
    const result = await recipesCollection.insertOne({
      author,
      title,
      subtitle,
      image,
      cookingTimeInMins,
      ingredients,
      instructions,
      dietTypes,
    });

    return await recipesCollection.findOne({ _id: result.insertedId });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addRating = async ({ id, author, rating, comment }: Review) => {
  try {
    const db = await connectToDB();
    const recipesCollection = db.collection("recipes");

    if (rating > 5) {
      throw new Error("Rating cannot be more than 5.");
    }

    await recipesCollection.updateOne({ _id: new ObjectId(id) }, {
      $push: {
        reviews: {
          author,
          rating,
          comment,
        },
      },
    } as any);

    return await recipesCollection.findOne({ _id: new ObjectId(id) });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
