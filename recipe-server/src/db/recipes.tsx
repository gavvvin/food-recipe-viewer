import { ObjectId } from "mongodb";
import { connectToDB } from "./connection";
import { Recipe, Review } from "../types/recipe.types";

export const getRecipes = async (id?: string) => {
  try {
    const db = await connectToDB();
    const recipesCollection = db.collection("recipes");
    const userCollection = db.collection("users");

    if (id) {
      return await recipesCollection
        .findOne({ _id: new ObjectId(id) })
        .then(async (data) => {
          const author =
            data && (await userCollection.findOne({ userId: data.authorId }));
          const response = {
            author,
            ...data,
          };
          return response;
        });
    } else {
      return await recipesCollection
        .find()
        .toArray()
        .then((data) => {
          const response = data.map(async (recipe) => {
            const author =
              recipe &&
              (await userCollection.findOne({ userId: recipe.authorId }));
            return {
              author,
              ...recipe,
            };
          });
          return response;
        });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUser = async (userId: string) => {
  try {
    if (!userId) throw Error("Missing user ID");

    const db = await connectToDB();
    const recipesCollection = db.collection("recipes");
    const userCollection = db.collection("users");

    return await userCollection
      .findOne({ userId: parseInt(userId) })
      .then(async (data) => {
        const fullRecipeData =
          data &&
          (await Promise.all(
            data.favoriteRecipes.map(async (recipeId: string) => {
              const recipe = await recipesCollection.findOne({
                _id: new ObjectId(recipeId),
              });
              return recipe;
            }),
          ));
        return {
          ...data,
          favoriteRecipes: fullRecipeData,
        };
      });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createRecipe = async ({
  authorId,
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
    if (!authorId) throw Error("Missing author ID");

    const db = await connectToDB();
    const recipesCollection = db.collection("recipes");
    const userCollection = db.collection("users");

    const result = await recipesCollection.insertOne({
      authorId: parseInt(authorId),
      title,
      subtitle,
      image,
      cookingTimeInMins,
      ingredients,
      instructions,
      dietTypes,
    });

    const response = await recipesCollection
      .findOne({ _id: result.insertedId })
      .then(async (data) => {
        const author =
          data && (await userCollection.findOne({ userId: data.authorId }));
        const response = {
          author,
          ...data,
        };
        return response;
      });
    return response;
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

export const favoriteRecipe = async ({ userId, recipeId, isFavorite }: any) => {
  try {
    console.log(userId, typeof userId, recipeId, isFavorite);
    if (!userId) throw new Error("Missing user ID");
    if (!recipeId) throw new Error("Missing recipe ID");

    const db = await connectToDB();
    const userCollection = db.collection("users");

    if (isFavorite) {
      return await userCollection.findOneAndUpdate(
        { userId: parseInt(userId) },
        {
          $addToSet: {
            favoriteRecipes: recipeId,
          },
        },
        {
          returnDocument: "after",
        },
      );
    } else {
      return await userCollection.findOneAndUpdate(
        { userId: parseInt(userId) },
        {
          $pull: {
            favoriteRecipes: recipeId,
          },
        },
        {
          returnDocument: "after",
        },
      );
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
