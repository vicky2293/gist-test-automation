import { describe, expect, test } from 'vitest';
import { gistApi } from '../fixtures/gist.fixture.js';
import { validateSchema } from '../utils/schema-validator.js';

describe('DELETE /gists/{gistId}', () => {
  test('delete gist - returns 204', async () => {
    const requestBody = {
      description: 'Example of a gist',
      public: false,
      files: { 'README.md': { content: 'Hello World' } },
    };

    const create_response = await gistApi.createGist('authenticated', requestBody);
    expect(create_response.status).toBe(201);
    const gist_id = create_response.body.id;
    validateSchema('createGist.json', create_response.body);

    const delete_response = await gistApi.deleteGist('authenticated', gist_id);
    expect(delete_response.status).toBe(204);
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
