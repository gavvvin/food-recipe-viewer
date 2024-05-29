import { gql } from "@apollo/client";

// ======== QUERIES ========

export const GET_RECIPES = gql`
  query getAllRecipes {
    recipes {
      _id
      author {
        name
        userId
      }
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
      author {
        name
        userId
      }
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

export const GET_USER = gql`
  query getUser($id: ID!) {
    me(userId: $id) {
      _id
      userId
      name
      favoriteRecipes {
        _id
      }
    }
  }
`;

// ======== MUTATIONS ========

export const RATE_RECIPE = gql`
  mutation addRating(
    $id: ID!
    $author: String
    $rating: Int
    $comment: String
  ) {
    addRating(id: $id, author: $author, rating: $rating, comment: $comment) {
      _id
      reviews {
        rating
        comment
      }
    }
  }
`;

export const SET_FAVORITE = gql`
  mutation favoriteRecipe($userId: ID!, $isFavorite: Boolean, $recipeId: ID!) {
    favoriteRecipe(
      userId: $userId
      isFavorite: $isFavorite
      recipeId: $recipeId
    ) {
      _id
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe(
    $authorId: ID!
    $title: String!
    $subtitle: String
    $image: String
    $cookingTimeInMins: Int
    $ingredients: [IngredientInput]
    $instructions: [String]
    $dietTypes: [DietType]
  ) {
    createRecipe(
      authorId: $authorId
      title: $title
      subtitle: $subtitle
      image: $image
      cookingTimeInMins: $cookingTimeInMins
      ingredients: $ingredients
      instructions: $instructions
      dietTypes: $dietTypes
    ) {
      _id
    }
  }
`;
