import request, { Response } from 'supertest';
import { env } from '../../config/env.js';

export class GistApi {
  private readonly client = request(env.githubBaseUrl);

  async listGists(queryParams: Record<string, string | number | boolean> | null = null,) {
    const req = this.client
    .get(`/gists`)
    .set('Accept', 'application/vnd.github+json')
    .set('X-GitHub-Api-Version', '2026-03-10')
    .set('User-Agent', 'gist-api-test-framework');

   if (queryParams != null) {
      req.query(queryParams);
    }

    return req;
  }
}

