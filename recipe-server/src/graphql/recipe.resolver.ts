import {
  addRating,
  createRecipe,
  getRecipes,
  favoriteRecipe,
  getUser,
} from "../db/recipes";
import { Recipe } from "../types/recipe.types";

const recipeResolver = {
  Query: {
    recipes: async () => await getRecipes(),
    recipe: async (_: any, { id }: { id: string }) => await getRecipes(id),
    me: async (_: any, { userId }: { userId: string }) => await getUser(userId),
  },
  Mutation: {
    createRecipe: async (
      _: any,
      {
        authorId,
        title,
        subtitle,
        image,
        cookingTimeInMins,
        ingredients,
        instructions,
        dietTypes,
      }: Recipe,
    ) =>
      await createRecipe({
        authorId,
        title,
        subtitle,
        image,
        cookingTimeInMins,
        ingredients,
        instructions,
        dietTypes,
      }),

    addRating: async (
      _: any,
      {
        id,
        author,
        rating,
        comment,
      }: { id: string; author: string; rating: number; comment: string },
    ) => {
      return await addRating({ id, author, rating, comment });
    },
    favoriteRecipe: async (_: any, { userId, recipeId, isFavorite }: any) =>
      await favoriteRecipe({ userId, recipeId, isFavorite }),
  },
};

exports.resolver = recipeResolver;
