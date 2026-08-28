import { describe, expect, test } from 'vitest';
import { gistApi } from '../fixtures/gist.fixture.js';

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
