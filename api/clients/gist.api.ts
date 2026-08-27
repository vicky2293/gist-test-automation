import request, { Response } from 'supertest';
import { env } from '../../config/env.js';
import type { Authentication } from '../models/types.js';

export class GistApi {
  private readonly client = request(env.githubBaseUrl);

  async listGists(
    authentication: Authentication = 'unauthenticated',
    queryParams: Record<string, string | number | boolean> | null = null,
  ) {
    const req = this.client
      .get(`/gists`)
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10')
      .set('User-Agent', 'gist-api-test-framework');

    if (authentication === 'authenticated') {
      if (!env.githubToken) {
        throw new Error('GITHUB_TOKEN is required for authenticated requests');
      }
      req.set('Authorization', `Bearer ${env.githubToken}`);
    }

    if (queryParams != null) {
      req.query(queryParams);
    }

    return req;
  }

  async invalidListGists() {
    // Request without User-Agent
    const req = this.client
      .get(`/gists`)
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10');

    return req;
  }

  async invalidTokenListGists() {
    // Invalid auth_token
    const req = this.client
      .get(`/gists`)
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10')
      .set('Authorization', 'Bearer invalid token')
      .set('User-Agent', 'gist-api-test-framework');

    return req;
  }
}
