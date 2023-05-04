import fetch from 'node-fetch';

const url = `${process.env.DEV_DGRAPH_ADMIN_ENDPOINT}/schema/validate?=`;

export const validateSchema = async (Schema: string) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'text/plain',
      'X-Dgraph-AuthToken': process.env.DEV_DGRAPH_ADMIN_ENDPOINT!,
    },
    body: Schema,
  };
  let res = null;
  try {
    res = await (await fetch(url, options)).json();
  } catch (error) {
    console.error(error);
    throw new Error(`failde to validate ${Error}`);
  }
  return res;
};
