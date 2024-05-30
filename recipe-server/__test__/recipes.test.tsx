import {
  getRecipes,
  getUser,
  createRecipe,
  addRating,
  favoriteRecipe,
} from "../src/db/recipes";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDB } from "../src/db/connection";
import { Collection } from "mongodb";
import { DietType } from "../src/types/recipe.types";

describe("recipes", () => {
  let mongoServer: MongoMemoryServer;
  let recipesCollection: Collection;
  let usersCollection: Collection;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    process.env.MONGO_DB_ENDPOINT = await mongoServer.getUri();

    const db = await connectToDB();
    recipesCollection = db.collection("recipes");
    usersCollection = db.collection("users");

    await recipesCollection.insertMany([
      { title: "Recipe 1", authorId: 1 },
      { title: "Recipe 2", authorId: 2 },
    ]);

    await usersCollection.insertMany([
      { userId: 1, favoriteRecipes: [] },
      { userId: 2, favoriteRecipes: [] },
    ]);
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it("should return all recipes when no ID is provided", async () => {
    const recipesPromise = await getRecipes();
    if (Array.isArray(recipesPromise)) {
      const recipes = await Promise.all(recipesPromise);
      expect(recipes.length).toBe(2);
    } else {
      throw new Error("Expected an array of recipes");
    }
  });

  it("should return a single recipe when an ID is provided", async () => {
    const recipe = await getRecipes("1");
    expect(recipe).toMatchObject({ title: "Recipe 1", authorId: 1 });
  });

  it("should return user data with favorite recipes when getUser is called with a userId", async () => {
    const user = await getUser("1");
    expect(user).toMatchObject({ userId: 1, favoriteRecipes: [] });
  });

  it("should create a new recipe when createRecipe is called with valid data", async () => {
    const newRecipe = {
      authorId: "1",
      title: "Recipe 3",
      subtitle: "Subtitle 3",
      image: "image_3.jpg",
      cookingTimeInMins: 45,
      ingredients: [
        { ingredient: "Chicken", amount: 1, unit: "lb" },
        { ingredient: "Bell Peppers", amount: 3, unit: "medium" },
        { ingredient: "Onion", amount: 1, unit: "large" },
        { ingredient: "Fajita Seasoning", amount: 1, unit: "packet" },
        { ingredient: "Flour Tortillas", amount: 8, unit: "medium" },
      ],
      instructions: ["instruction_1", "instruction_2"],
      dietTypes: [DietType.HIGH_PROTEIN],
    };

    const createdRecipe = await createRecipe(newRecipe);
    expect(createdRecipe).toMatchObject(newRecipe);
  });

  it("should add a rating to a recipe when addRating is called with valid data", async () => {
    const review = {
      id: "1",
      author: "Reviewer 1",
      rating: 4,
      comment: "Great recipe!",
    };

    const updatedRecipe = await addRating(review);
    if (updatedRecipe) {
      expect(updatedRecipe.reviews).toContainEqual(review);
    } else {
      throw new Error("The updated recipe should not be null");
    }
  });

  it("should add a recipe to user favorite recipes when favoriteRecipe is called with isFavorite set to true", async () => {
    const updatedUser = await favoriteRecipe({
      userId: "1",
      recipeId: "1",
      isFavorite: true,
    });

    if (updatedUser) {
      expect(updatedUser.value.favoriteRecipes).toContain("1");
    } else {
      throw new Error("The updated user should not be null");
    }
  });

  it("should remove a recipe from user favorite recipes when favoriteRecipe is called with isFavorite set to false", async () => {
    const updatedUser = await favoriteRecipe({
      userId: "1",
      recipeId: "1",
      isFavorite: false,
    });

    if (updatedUser) {
      expect(updatedUser.value.favoriteRecipes).not.toContain("1");
    } else {
      throw new Error("The updated user should not be null");
    }
  });
});
