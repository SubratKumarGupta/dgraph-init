//warning
async function updateTimestamps({ event, graphql, authHeader }) {
  console.log('somthing');
  const r = { a: 'aa' }; //await graphql();
  return r;
}
const webHookResolvers = {
  'Session.add': updateTimestamps,
  'Session.delete': updateTimestamps,
  'DefultCollection.add': updateTimestamps,
  'DefultCollection.delete': updateTimestamps,
  'User.add': updateTimestamps,
  'User.update': updateTimestamps,
  'User.delete': updateTimestamps,
};
self.addWebHookResolvers(webHookResolvers);
