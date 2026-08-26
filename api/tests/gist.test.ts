import { describe, expect, it, beforeAll } from 'vitest';
import { GistApi } from '../clients/gist.api.js';
import { Gist } from '../models/types.js';
import { validateSchema } from '../utils/schema-validator.js';
import { GistFixtures } from '../fixtures/gist.fixture.js';

let gistApi: GistApi;

beforeAll(() => {
  gistApi = new GistApi();
});

describe('GET /gists', () => {
  it('gets list of gists as unauthenticated user - returns 200', async () => {
    const response = await gistApi.listGists();
    expect(response.status).toBe(200);

    const gists = response.body as Gist[];
    expect(gists.length).toBeGreaterThan(0);
    gists.forEach((gist) => {
      expect(gist.public).toBe(true);
    });

    validateSchema('listGist.json', response.body);
  });

  it('cannot request without User Agent Header - returns 403', async () => {
    const response = await gistApi.invalidListGists();
    expect(response.status).toBe(403);
  });
});
