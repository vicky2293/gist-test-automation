import { describe, expect, test } from 'vitest';
import { gistApi } from '../../fixtures/gist.fixture.js';
import { validateSchema } from '../../utils/schema-validator.js';

const createRequestBody = {
  description: 'Example of a gist',
  public: false,
  files: { 'README.md': { content: 'Hello World' } },
};

const updateRequestBody = {
  description: 'An updated gist description',
  public: false,
  files: { 'README.md': { content: 'Hello World from GitHub' } },
};

describe('E2E user flow', () => {
  test('crud operations', async () => {
    // create gist
    const create_response = await gistApi.createGist('authenticated', createRequestBody);
    expect(create_response.status).toBe(201);

    const gist_id = create_response.body.id;
    validateSchema('createGist.json', create_response.body);

    // get gist
    const get_response = await gistApi.getGist('authenticated', gist_id);
    expect(get_response.status).toBe(200);
    expect(get_response.body.id === gist_id);

    validateSchema('getGist.json', get_response.body);

    // update gist
    const update_response = await gistApi.updateGist('authenticated', gist_id, updateRequestBody);
    expect(update_response.status).toBe(200);
    expect(update_response.body.id === gist_id);

    validateSchema('updateGist.json', update_response.body);

    // delete gist
    const delete_response = await gistApi.deleteGist('authenticated', gist_id);
    expect(delete_response.status).toBe(204);
  });
});
