import { gql } from "@apollo/client";

export const GET_RECIPES = gql`
  query getAllRecipes {
    recipes {
      _id
      author
      title
      subtitle
      image
      cookingTimeInMins
      ingredients {
        ingredient
        amount
        unit
      }
      instructions
      dietTypes
      reviews {
        author
        rating
        comment
      }
    }
  }
`;

export const GET_RECIPE = gql`
  query getRecipe($id: ID!) {
    recipe(id: $id) {
      _id
      author
      title
      subtitle
      image
      cookingTimeInMins
      ingredients {
        ingredient
        amount
        unit
      }
      instructions
      dietTypes
      reviews {
        author
        rating
        comment
      }
    }
  }
`;
