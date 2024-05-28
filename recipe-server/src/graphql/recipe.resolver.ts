import { getRecipes } from "../db/recipes";

const recipeResolver = {
  Query: {
    recipes: async () => await getRecipes(),
    recipe: async (_: any, { id }: { id: string }) => await getRecipes(id),
  },
};

exports.resolver = recipeResolver;
