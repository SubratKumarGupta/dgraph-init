import { env } from 'process';

console.log(env.DEV_DGRAPH_GRAPHQL_KEY);
const config = {
  schema: [
    {
      'http://localhost:8080/admin': {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-Dgraph-AuthToken': env.DEV_DGRAPH_GRAPHQL_KEY, //not type safe
        },
      },
    },
  ],
  documents: ['./admin/oprations'],
  generates: {
    './admin/scripts/generatedTyps.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        fetcher: 'graphql-request',
      },
    },
  },
};

export default config;
