import { ApolloServer, gql } from "apollo-server-express";
import {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { buildSubgraphSchema } from "@apollo/federation";
import glue from "schemaglue";

// Glue schemas/resolvers together
const { schema, resolver } = glue("./recipe-server/src/graphql", {
  mode: "ts",
});

// Initialise Apollo server
const initialiseApolloServer = (app: any) => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs: gql(schema),
      resolvers: resolver,
    }),
    plugins: [
      ApolloServerPluginInlineTraceDisabled(),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
  // Middleware: GraphQL
  server.start().then(() =>
    server.applyMiddleware({
      app,
    }),
  );
};

export default initialiseApolloServer;
