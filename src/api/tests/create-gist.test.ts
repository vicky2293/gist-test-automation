import { describe, expect, test } from 'vitest';
import { gistApi } from '../fixtures/gist.fixture.js';
import { validateSchema } from '../utils/schema-validator.js';
import type { CreateGistRequest } from '../models/types.js';

const requestBody = {
  description: 'Example of a gist',
  public: false,
  files: { 'README.md': { content: 'Hello World' } },
};

describe('POST /gists', () => {
  test('create private gists - returns 201', async () => {
    const response = await gistApi.createGist('authenticated', requestBody);
    expect(response.status).toBe(201);
    expect(response.body.public).toBe(false);
    const gistId = response.body.id;

    validateSchema('createGist.json', response.body);

    const delete_response = await gistApi.deleteGist('authenticated', gistId);
    expect(delete_response.status).toBe(204);
  });

  test('create public gists - returns 201', async () => {
    const requestBody = {
      description: 'Example of a gist',
      public: true,
      files: { 'README.md': { content: 'Hello World' } },
    };
    const response = await gistApi.createGist('authenticated', requestBody);
    expect(response.status).toBe(201);
    expect(response.body.public).toBe(true);
    const gistId = response.body.id;
    validateSchema('createGist.json', response.body);

    const delete_response = await gistApi.deleteGist('authenticated', gistId);
    expect(delete_response.status).toBe(204);
  });

  test('cannot create gist with personal access token - returns 401', async () => {
    const response = await gistApi.createGist('unauthenticated', requestBody);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Requires authentication');
  });

  test('cannot create gist without required body paramter - returns 422', async () => {
    const invalidRequestBody = {
      description: 'Example of a gist',
      public: false,
    } as CreateGistRequest;

    const response = await gistApi.createGist('authenticated', invalidRequestBody);
    expect(response.status).toBe(422);
    expect(response.body.message).toContain(
      'Invalid input: object is missing required key: files.',
    );
  });
});
