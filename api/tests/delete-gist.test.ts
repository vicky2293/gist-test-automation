import { describe, expect, beforeAll, test } from 'vitest';
import { GistApi } from '../clients/gist.api.js';
import { validateSchema } from '../utils/schema-validator.js';
import { env } from '../../config/env.js';

let gistApi: GistApi;

beforeAll(() => {
  gistApi = new GistApi();
});

describe('DELETE /gists/{gistId}', () => {
  test('delete gist - returns 204', async () => {
    const response = await gistApi.deleteGist('authenticated', 'ENTER_GIST_ID'); //Enter Gist id during runtime
    expect(response.status).toBe(204);
  });

  test('cannot delete gist with invalid gistId - returns 404', async () => {
    const response = await gistApi.deleteGist('authenticated', 'invalid-id');
    expect(response.status).toBe(404);
  });

  test('cannot get gist with null gistId - returns 404', async () => {
    const response = await gistApi.deleteGist('authenticated', '');
    expect(response.status).toBe(404);
  });
});
