import {
  addRating,
  createRecipe,
  getRecipes,
  favoriteRecipe,
  getUser,
} from "../db/recipes";
import { ReviewInput, Recipe } from "../types/recipe.types";

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
      { review: { id, author, rating, comment } }: ReviewInput,
    ) => {
      return await addRating({ id, author, rating, comment });
    },
    favoriteRecipe: async (_: any, { userId, recipeId, isFavorite }: any) =>
      await favoriteRecipe({ userId, recipeId, isFavorite }),
  },
};

exports.resolver = recipeResolver;
