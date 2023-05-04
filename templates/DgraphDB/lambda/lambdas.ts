import type { WebHookGraphQLEvent } from '@slash-graphql/lambda-types';
type WebHookResolvers = {
  [key: string]: (e: WebHookGraphQLEvent) => Promise<unknown>;
};

/*warning you can import anything but types in this alpha version  of dgraph-init*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function webHook({ event, graphql, authHeader, dql }: WebHookGraphQLEvent) {
  //write web hook your code hear
  const lambda = 'lambda';
  console.log(`do somthing in  ${lambda}`);
  return lambda;
}

const webHookResolvers: WebHookResolvers = {
  'Session.add': webHook,
  'Session.delete': webHook,
  'User.add': webHook,
  'User.update': webHook,
  'User.delete': webHook,
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(self as any).addWebHookResolvers(webHookResolvers);
