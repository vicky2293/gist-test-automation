import { Ajv } from 'ajv';
import addFormats from 'ajv-formats';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const addFormat = addFormats as unknown as typeof addFormats.default;
const ajv = new Ajv({
  allErrors: true,
  strict: true,
});

addFormat(ajv);

const SCHEMA_DIR = path.resolve('api/schemas');

export function validateSchema(schemaFileName: string, response: unknown) {
  const schemaPath = path.join(SCHEMA_DIR, schemaFileName);

  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));

  const validate = ajv.compile(schema);

  if (!validate(response)) {
    throw new Error(
      `Schema validation failed for ${schemaFileName}:\n` +
        JSON.stringify(validate.errors, null, 2),
    );
  }
}
