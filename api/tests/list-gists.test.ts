import { describe, expect, beforeAll, test } from 'vitest';
import { gistApi } from '../fixtures/gist.fixture.js';
import { Gist } from '../models/types.js';
import { validateSchema } from '../utils/schema-validator.js';

describe('GET /gists - unauthenticated', () => {
  test('list gists - returns 200', async () => {
    const response = await gistApi.listGists('unauthenticated');
    expect(response.status).toBe(200);

    const gists = response.body as Gist[];
    expect(gists.length).toBeGreaterThan(0);
    gists.forEach((gist) => {
      expect(gist.public).toBe(true);
    });

    validateSchema('listGist.json', response.body);
  });

  test('list gists using query params - returns 200', async () => {
    // const today = new Date().toISOString(); // format: YYYY-MM-DDTHH:MM:SSZ
    const queryParams = { since: '2026-01-01T00:00:00Z', per_page: 1, page: 1 };
    const response = await gistApi.listGists('unauthenticated', queryParams);
    expect(response.status).toBe(200);

    const body = response.body;
    expect(body.length).toBe(1);
    validateSchema('listGist.json', response.body);
  });

  test('cannot request without User Agent Header - returns 403', async () => {
    const response = await gistApi.invalidListGists();
    expect(response.status).toBe(403);
  });
});

describe('GET /gists - authenticated', () => {
  test('list gists - returns 200', async () => {
    const response = await gistApi.listGists('authenticated');
    expect(response.status).toBe(200);
    validateSchema('listGist.json', response.body);
  });

  test('list gists using query params - returns 200', async () => {
    // const today = new Date().toISOString(); // format: YYYY-MM-DDTHH:MM:SSZ
    const queryParams = { since: '2026-01-01T00:00:00Z', per_page: 1, page: 1 };
    const response = await gistApi.listGists('authenticated', queryParams);
    expect(response.status).toBe(200);

    const body = response.body;
    expect(body.length).toBe(0);
    validateSchema('listGist.json', response.body);
  });

  test('cannot list gist with invalid token - returns 401', async () => {
    const response = await gistApi.invalidTokenListGists();
    expect(response.status).toBe(401);
  });
});
