import request from 'supertest';
import { env } from '../../config/env.js';
import type { Authentication, CreateGistRequest, UpdateGistRequest } from '../models/types.js';

export class GistApi {
  private readonly client = request(env.githubBaseUrl);

  private addAuthentication(req: request.Test, authentication: Authentication) {
    if (authentication === 'authenticated') {
      if (!env.githubToken) {
        throw new Error('GITHUB_TOKEN is required for authenticated requests');
      }

      req.set('Authorization', `Bearer ${env.githubToken}`);
    }

    return req;
  }

  private addFineGrainedAuthentication(req: request.Test, authentication: Authentication) {
    if (authentication === 'authenticated') {
      if (!env.githubToken) {
        throw new Error('GITHUB_TOKEN is required for authenticated requests');
      }

      req.set('Authorization', `Bearer ${env.githubFineGrainedToken}`);
    }

    return req;
  }

  async listGists(
    authentication: Authentication = 'unauthenticated',
    queryParams: Record<string, string | number | boolean> | null = null,
  ) {
    const req = this.client
      .get('/gists')
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10')
      .set('User-Agent', 'gist-api-test-framework');

    this.addAuthentication(req, authentication);

    if (queryParams != null) {
      req.query(queryParams);
    }

    return req;
  }

  async invalidListGists() {
    // Request without User-Agent
    const req = this.client
      .get('/gists')
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10');

    return req;
  }

  async invalidTokenListGists() {
    // Invalid auth_token
    const req = this.client
      .get('/gists')
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10')
      .set('Authorization', 'Bearer invalid token')
      .set('User-Agent', 'gist-api-test-framework');

    return req;
  }

  async createGist(
    authentication: Authentication = 'authenticated',
    requestBody: CreateGistRequest,
  ) {
    const req = this.client
      .post('/gists')
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10')
      .set('User-Agent', 'gist-api-test-framework');

    this.addAuthentication(req, authentication);

    req.send(requestBody);

    return req;
  }

  async getGist(authentication: Authentication = 'authenticated', gistId: string) {
    const req = this.client
      .get(`/gists/${gistId}`)
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10')
      .set('User-Agent', 'gist-api-test-framework');

    this.addAuthentication(req, authentication);

    return req;
  }

  async getFGTokenGist(authentication: Authentication = 'authenticated', gistId: string) {
    const req = this.client
      .get(`/gists/${gistId}`)
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10')
      .set('User-Agent', 'gist-api-test-framework');

    this.addFineGrainedAuthentication(req, authentication);

    return req;
  }

  async updateGist(
    authentication: Authentication = 'authenticated',
    gistId: string,
    requestBody: UpdateGistRequest,
  ) {
    const req = this.client
      .patch(`/gists/${gistId}`)
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10')
      .set('User-Agent', 'gist-api-test-framework');

    this.addAuthentication(req, authentication);

    req.send(requestBody);

    return req;
  }

  async deleteGist(authentication: Authentication = 'authenticated', gistId: string) {
    const req = this.client
      .delete(`/gists/${gistId}`)
      .set('Accept', 'application/vnd.github+json')
      .set('X-GitHub-Api-Version', '2026-03-10')
      .set('User-Agent', 'gist-api-test-framework');

    this.addAuthentication(req, authentication);

    return req;
  }
}
