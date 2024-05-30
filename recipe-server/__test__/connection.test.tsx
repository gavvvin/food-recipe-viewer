import { connectToDB } from "../src/db/connection";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("connectToDB", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    process.env.MONGO_DB_ENDPOINT = await mongoServer.getUri();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it("should connect to the in-memory MongoDB server and return the correct database", async () => {
    const db = await connectToDB();
    expect(db.databaseName).toBe("recipes");
  });
});
