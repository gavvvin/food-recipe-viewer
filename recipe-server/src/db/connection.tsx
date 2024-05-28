import { MongoClient, ServerApiVersion } from "mongodb";

export async function connectToDB() {
  const uri = process.env.MONGO_DB_ENDPOINT || "";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    return client.db("recipes");
  } catch (err) {
    console.error(err);
    throw err;
  }
}
