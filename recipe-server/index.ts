import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import initialiseApolloServer from "./apolloServer";

dotenv.config();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

// Initialise Apollo server
initialiseApolloServer(app);

server.listen({ port: 3001 }, () => {
  console.log("ChargePoint Server Ready on port 3001");
});

// Shut down in the case of interrupt and termination signals
["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => server.close());
});
