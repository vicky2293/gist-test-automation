import { describe, expect, beforeAll, test } from 'vitest';
import { GistApi } from '../clients/gist.api.js';
import { validateSchema } from '../utils/schema-validator.js';
import { env } from '../../config/env.js';

let gistApi: GistApi;
const requestBody = {
  description: 'An updated gist description',
  files: { 'README.md': { content: 'Hello World from GitHub' } },
};

beforeAll(() => {
  gistApi = new GistApi();
});

describe('PATCH /gists/{gist_id}', () => {
  test('list gists - returns 200', async () => {
    const response = await gistApi.updateGist('authenticated', env.gistId, requestBody);
    expect(response.status).toBe(200);

    validateSchema('updateGist.json', response.body);
  });

  test('can update gist without body paramter - returns 200', async () => {
    const response = await gistApi.updateGist('authenticated', env.gistId, {});
    expect(response.status).toBe(200);
  });

    test('cannot update gist with invalid gist-id - returns 404', async () => {
    const response = await gistApi.updateGist('authenticated', '1223' , {});
    expect(response.status).toBe(404);
  });
});
