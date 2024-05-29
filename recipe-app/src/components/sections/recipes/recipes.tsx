import { useQuery } from "@apollo/client";
import { GET_RECIPES } from "../../utils/queries";
import { Grid } from "../../atoms/wrapper/wrapper";
import { Recipe } from "../../atoms/recipe/recipe";

export const Recipes = () => {
  const recipes = useQuery(GET_RECIPES);

  return (
    <Grid>
      {recipes?.data?.recipes?.length > 0 &&
        recipes?.data.recipes.map((recipe) => {
          return (
            <Recipe
              key={recipe._id}
              recipeId={recipe._id}
              author={recipe.author.name}
              title={recipe.title}
              subtitle={recipe.subtitle}
              image={recipe.image}
              cookingTimeInMins={recipe.cookingTimeInMins}
              dietTypes={recipe.dietTypes}
            />
          );
        })}
    </Grid>
  );
};
