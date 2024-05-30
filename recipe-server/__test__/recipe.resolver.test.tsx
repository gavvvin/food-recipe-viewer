import { recipeResolver } from "../src/graphql/recipe.resolver";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDB } from "../src/db/connection";
import { RecipeMockData } from "../src/db/recipeMockData";
import { UserMockData } from "../src/db/userMockData";
import { DietType } from "../src/types/recipe.types";

describe("recipeResolver", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    process.env.MONGO_DB_ENDPOINT = await mongoServer.getUri();

    const db = await connectToDB();
    const recipesCollection = db.collection("recipes");
    const usersCollection = db.collection("users");
    await recipesCollection.insertMany(RecipeMockData);
    await usersCollection.insertMany(UserMockData);
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it("should return all recipes when no ID is provided", async () => {
    const result = await recipeResolver.Query.recipes();
    if (Array.isArray(result)) {
      expect(result.length).toBe(RecipeMockData.length);
    } else {
      throw new Error("Expected an array of recipes");
    }
  });

  it("should return a single recipe when an ID is provided", async () => {
    const recipeId = RecipeMockData[0]._id.toHexString();
    const result = await recipeResolver.Query.recipe(null, { id: recipeId });
    expect(result).toMatchObject(RecipeMockData[0]);
  });

  it("should return user data when me resolver is called with a userId", async () => {
    const userId = UserMockData[0].userId.toString();
    const result = await recipeResolver.Query.me(null, { userId });
    expect(result).toMatchObject(UserMockData[0]);
  });

  it("should create a new recipe when createRecipe resolver is called with valid data", async () => {
    const newRecipe = {
      authorId: "3",
      title: "New Recipe",
      subtitle: "New Subtitle",
      image: "new_image.jpg",
      cookingTimeInMins: 30,
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

    const result = await recipeResolver.Mutation.createRecipe(null, newRecipe);
    expect(result).toMatchObject(newRecipe);
  });

  it("should add a rating to a recipe when addRating resolver is called with valid data", async () => {
    const review = {
      id: RecipeMockData[0]._id.toHexString(),
      author: "Reviewer 1",
      rating: 5,
      comment: "Amazing recipe!",
    };

    const result = await recipeResolver.Mutation.addRating(null, review);
    if (!result) throw new Error("Expected a review object");
    expect(result.reviews).toContainEqual(review);
  });

  it("should add a recipe to user favorite recipes when favoriteRecipe resolver is called with isFavorite set to true", async () => {
    const userId = UserMockData[0].userId;
    const recipeId = RecipeMockData[0]._id.toHexString();

    const result = await recipeResolver.Mutation.favoriteRecipe(null, {
      userId,
      recipeId,
      isFavorite: true,
    });

    if (!result) throw new Error("Expected a review object");
    expect(result.value.favoriteRecipes).toContain(recipeId);
  });

  it("should remove a recipe from user favorite recipes when favoriteRecipe resolver is called with isFavorite set to false", async () => {
    const userId = UserMockData[0].userId;
    const recipeId = RecipeMockData[0]._id.toHexString();

    const result = await recipeResolver.Mutation.favoriteRecipe(null, {
      userId,
      recipeId,
      isFavorite: false,
    });

    if (!result) throw new Error("Expected a review object");
    expect(result.value.favoriteRecipes).not.toContain(recipeId);
  });
});
