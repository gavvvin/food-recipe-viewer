import { RecipeMockData } from "./recipeMockData";
import { UserMockData } from "./userMockData";
import { connectToDB } from "./connection";

export const seedDatabase = async () => {
  try {
    const db = await connectToDB();

    const recipesCollection = db.collection("recipes");
    recipesCollection.drop().then(() => {
      recipesCollection.insertMany(RecipeMockData);
      return;
    });

    const userCollection = db.collection("users");
    userCollection.drop().then(() => {
      userCollection.insertMany(UserMockData);
    });
  } catch (err) {
    console.log(err);
  }
};
