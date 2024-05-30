import { seedDatabase } from "../src/db/seed";
import { RecipeMockData } from "../src/db/recipeMockData";
import { UserMockData } from "../src/db/userMockData";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDB } from "../src/db/connection";

describe("seedDatabase", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    process.env.MONGO_DB_ENDPOINT = await mongoServer.getUri();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it("should properly seed the database with mock data", async () => {
    await seedDatabase();

    const db = await connectToDB();
    const recipesCollection = db.collection("recipes");
    const userCollection = db.collection("users");

    const recipesCount = await recipesCollection.countDocuments();
    const usersCount = await userCollection.countDocuments();

    expect(recipesCount).toBe(RecipeMockData.length);
    expect(usersCount).toBe(UserMockData.length);
  });
});
