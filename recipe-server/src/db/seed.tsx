import { RecipeMockData } from "./recipeMockData";
import { connectToDB } from "./connection";

export const seedDatabase = async () => {
  try {
    const db = await connectToDB();
    const recipesCollection = db.collection("recipes");
    recipesCollection.drop();
    recipesCollection.insertMany(RecipeMockData);
    return;
  } catch (err) {
    console.log(err);
  }
};
