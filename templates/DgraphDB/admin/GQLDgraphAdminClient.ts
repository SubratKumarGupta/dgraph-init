import { GraphQLClient } from "graphql-request";

export const graphqlDgraphAdminRequestClient = new GraphQLClient(
  "http://localhost:8080/admin",
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Dgraph-AuthToken": `${process.env.DEV_DGRAPH_GRAPHQL_KEY}`,
    },
  }
);
