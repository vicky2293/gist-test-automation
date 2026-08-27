import { describe, expect, it, beforeAll, test } from 'vitest';
import { GistApi } from '../clients/gist.api.js';
import { Gist } from '../models/types.js';
import { validateSchema } from '../utils/schema-validator.js';
import { GistFixtures } from '../fixtures/gist.fixture.js';

let gistApi: GistApi;
const requestBody = {
  description: 'Example of a gist',
  public: false,
  files: { 'README.md': { content: 'Hello World' } },
};

beforeAll(() => {
  gistApi = new GistApi();
});

describe('POST /gists', () => {
  test('list gists - returns 201', async () => {
    const response = await gistApi.createGist('authenticated', requestBody);
    expect(response.status).toBe(201);

    validateSchema('createGist.json', response.body);
  });

  test('cannot create gist with personal access token - returns 403', async () => {
    const response = await gistApi.createGist('unauthenticated', requestBody);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Requires authentication');
  });
});
