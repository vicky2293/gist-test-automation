import { describe, expect, it } from 'vitest';
import { GistApi } from '../clients/gist.api.js';
import { Gist } from '../models/types.js'

describe('GET /gists', () => {
  it('gets list of gists', async () => {
    const gistApi = new GistApi();

    const response = await gistApi.listGists();
    expect(response.status).toBe(200);

    const gists = response.body as Gist[];
    expect(gists.length).toBeGreaterThan(0);
    gists.forEach((gist) => {
      expect(gist.public).toBe(true);
    });
  });
});