import { graphqlDgraphAdminRequestClient } from '../GQLDgraphAdminClient';
import { validateSchema } from './utils/validate';
import { getSdk } from './generatedTyps';
import { readFile, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const sync = async () => {
  const SchemaPath = join(process.cwd(), './schema/schema.gql');
  const GenSchemaPath = join(process.cwd(), './schema/genratedSchema.gql');
  console.log(SchemaPath);
  const schema = readFileSync(SchemaPath, { encoding: 'utf-8' });
  console.log(schema);
  const isValid: any = await validateSchema(schema);
  if (isValid.errors[0].message !== 'Schema is valid') {
    console.error(isValid.errors[0].message, isValid.errors[0].extensions.code);
    process.exit(2);
  } else {
    console.log('schema is valid');
    try {
      const res = await getSdk(graphqlDgraphAdminRequestClient).updateGQLSchema({ sch: schema });
      const generatedSchema = res.updateGQLSchema?.gqlSchema?.generatedSchema.trim();

      writeFileSync(GenSchemaPath, generatedSchema!, { encoding: 'utf-8' });
      console.log('updated generatedSchema');
    } catch (error) {
      console.error(error);
    }
  }
  return;
};
//
sync();
