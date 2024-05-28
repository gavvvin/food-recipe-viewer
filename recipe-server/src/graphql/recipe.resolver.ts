import { getRecipes } from "../db/connection";

const recipeResolver = {
  Query: {
    recipes: async () => await getRecipes(),
  },
};

exports.resolver = recipeResolver;
