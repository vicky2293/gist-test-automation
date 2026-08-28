import { describe, expect, beforeAll, test } from 'vitest';
import { GistApi } from '../clients/gist.api.js';
import { validateSchema } from '../utils/schema-validator.js';

let gistApi: GistApi;

beforeAll(() => {
  gistApi = new GistApi();
});

const id = 'ee4049c06e56b1639582190c986717d1';

describe('GET /gists/{gistId}', () => {
  test('get gist - returns 200', async () => {
    const response = await gistApi.getGist('authenticated', id);
    expect(response.status).toBe(200);
    validateSchema('getGist.json', response.body);
  });

  test('get gist using fine grained token- returns 200', async () => {
    const response = await gistApi.getFGTokenGist('authenticated', id);
    expect(response.status).toBe(200);
    validateSchema('getGist.json', response.body);
  });

  test('cannot get gist with invalid gistId - returns 404', async () => {
    const response = await gistApi.getGist('authenticated', 'invalid-id');
    expect(response.status).toBe(404);
  });
});
