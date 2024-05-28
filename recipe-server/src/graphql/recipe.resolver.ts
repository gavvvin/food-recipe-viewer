import { addRating, createRecipe, getRecipes } from "../db/recipes";
import { ReviewInput, Recipe } from "../types/recipe.types";

const recipeResolver = {
  Query: {
    recipes: async () => await getRecipes(),
    recipe: async (_: any, { id }: { id: string }) => await getRecipes(id),
  },
  Mutation: {
    createRecipe: async (
      _: any,
      {
        author,
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
        author,
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
      console.log(id);
      return await addRating({ id, author, rating, comment });
    },
  },
};

exports.resolver = recipeResolver;
