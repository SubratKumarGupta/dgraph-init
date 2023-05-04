# Dgraph-Init

## CLI tool for setting up dev instance of dgraph database

![dgraph-init](https://i.ibb.co/pPK2q3B/dgrap-init-removebg-preview.png)

<h2 id="getting-started">Getting Started</h2>

To create a db project using `dgraph-init`, run any of the following command and answer the command prompt questions:

```
$ npx dgraph-init
```

### AuthToken

you can find your defualt AuthToken inside the `.env` fie named `DEV_DGRAPH_GRAPHQL_KEY`

### Endpoints

- GraphQl - `localhost:8080/graphql`
- lambda - `localhost:8686/graphql-worker`
- admin - `localhost:8080/admin`
- ratelUi -`localhost:8000`

### Prerequisites

- Make sure you have `docker` and `docker-compose` installed.

<h2 id="managing-db">Managing DB instance</h2>

You can use `npm db ` to manage your docker containers related to your database.

`db` is just a sorthand for `docker-compose -f ./devCluster.yml --env-file .env ` so you can use it as docker-compose.

- `db up` spins up containers `alpha`,`zero`,`lambda`,`ratel` as described in `devCluster.yml`

- `db stop` stops all the container

- `db down` deletes all container

- `db down -v ` deletes all container along with all volumes

<h2 id="adding-schema">Adding GQL Schema</h2>

1. Paste your schema inside
   `schema/schema.gql `.

2. Run `db-updateSchema` to add mew schema to db ` .

- NOTE: If you run `db-updateSchema` without adding your schema it will use defualt schema ,you can change it by repeating the steps mentioned before.

<h2 id="using-lambda">Using lambda</h2>

1. You can write your lambda code in typescript inside of `lambda/lambdas.ts`

2. Compile your into javascript by running`db-lambdaBuild`

3. when you restart your server using `db down` and then `db up` your new lambda will used

<h2 id="admin queri">Admin Queries</h2>

1.  Write admin `query` or `mutation` inside of `admin/oprations` dirictiory, in a `.gql` or `.graphql` file, Make sure you have named the query in the file like this.

```GraphQL
mutation updateGQLSchema($sch: String!) {
  updateGQLSchema(input: { set: { schema: $sch } }) {
    gqlSchema {
      schema
      generatedSchema
    }
  }
}

```

2.  Make sure that your admin endpoint is live

3.  Run `gen-gql` to genrate a typesafe `sdk` that contains all your queries and mutaions inside `admin/oprations` dirictiory

4.  you can import the `sdk` from `admin/scripts/generatedTyps.ts`

5.  import `graphqlDgraphAdminRequestClient` which is a graphql-request Clint for admin endpoint, AuthToken is already attached to header when using `graphqlDgraphAdminRequestClient`

You can use the `sdk` like this :

```TypeScript
import { graphqlDgraphAdminRequestClient } from '../GQLDgraphAdminClient';
import { getSdk } from '`admin/scripts/generatedTyps';

const script =async () => {
 const schema:string=`
 type User {
   id: ID
   name: String
   email: String @search(by: [hash])
   emailVerified: DateTime
   image: String
 }
 `
 try {
   const res = await getSdk(graphqlDgraphAdminRequestClient).updateGQLSchema({ sch: schema });
   console.log('generatedSchema',res.updateGQLSchema);
 } catch (error) {
   console.error(error);
 }

}
script()

```

## Contributing

Feel free to contribute to the dgraph-init by creating a PR

## License

Dgraph-init is licensed under the [MIT License](https://opensource.org/license/mit/).
