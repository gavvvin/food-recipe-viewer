import { useQuery } from "@apollo/client";
import { GET_RECIPES, GET_USER } from "../../utils/queries";
import { Grid } from "../../atoms/wrapper/wrapper";
import { Recipe } from "../../atoms/recipe/recipe";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SelectBox } from "../../atoms/select/select";
import { Button } from "../../atoms/button/button";
import styled from "styled-components";

const BoxRelativePosition = styled.div`
  position: relative;
  margin-bottom: 3rem;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0.5rem;
`;

// Recipe cards in a grid layout
export const Recipes = () => {
  const allRecipes = useQuery(GET_RECIPES);
  const router = useRouter();
  const [recipes, setRecipes] = useState(allRecipes?.data?.recipes);

  useEffect(() => {
    setRecipes(allRecipes?.data?.recipes);
  }, [allRecipes]);

  const me = useQuery(GET_USER, {
    variables: {
      id: 1,
    },
  });

  const filterTable = async (filter?: string) => {
    if (filter === "any") setRecipes(allRecipes?.data?.recipes);
    else if (filter === "myRecipes") {
      const myRecipes = allRecipes?.data?.recipes.filter((recipe) => {
        return parseInt(recipe.author.userId) === 1; // hard coded as 1 until login system is implemented
      });
      setRecipes(myRecipes);
    } else if (filter === "myFavorites") {
      const favoriteRecipes = allRecipes?.data?.recipes.filter((recipe) => {
        return me?.data?.me?.favoriteRecipes.some((favoriteRecipe) => {
          return favoriteRecipe._id === recipe._id;
        });
      });
      setRecipes(favoriteRecipes);
    }
  };

  return (
    <>
      <BoxRelativePosition>
        <div>
          <SelectBox onChange={(e) => filterTable(e.target.value)}>
            <option value="any" selected>
              Any
            </option>
            <option value="myRecipes">My recipes</option>
            <option value="myFavorites">Favourite recipes</option>
          </SelectBox>
        </div>

        <ButtonWrapper>
          <Button
            variant={"primary"}
            onClick={() => router.push("/create-recipe")}
          >
            Create Recipe
          </Button>
        </ButtonWrapper>
      </BoxRelativePosition>

      <Grid>
        {recipes?.length > 0 &&
          recipes.map((recipe) => {
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
                // compare whether recipe ID exists in my favourite recipe array
                isFavorite={
                  me?.data?.me?.favoriteRecipes &&
                  me?.data?.me?.favoriteRecipes.some((favoriteRecipe) => {
                    return favoriteRecipe._id === recipe._id;
                  })
                }
              />
            );
          })}
      </Grid>
    </>
  );
};
