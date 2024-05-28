import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import initialiseApolloServer from "./apolloServer";
import { seedDatabase } from "./src/db/seed";

dotenv.config();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

// to seed the database with dummy data - to be removed.
app.put("/seed", async (_, res) => {
  try {
    await seedDatabase().then(() =>
      res.status(200).send({ status: "seeded database" }),
    );
  } catch (err) {
    res.status(400).send({ status: `Failed to seed db - ${err}` });
  }
});

// Initialise Apollo server
initialiseApolloServer(app);

server.listen({ port: 3001 }, () => {
  console.log("ChargePoint Server Ready on port 3001");
});

// Shut down in the case of interrupt and termination signals
["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => server.close());
});
