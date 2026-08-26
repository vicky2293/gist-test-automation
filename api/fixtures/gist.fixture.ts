import { beforeAll } from 'vitest';
import { GistApi } from '../clients/gist.api.js';

export interface GistFixtures {
  gistApi: GistApi;
}

let fixtures: GistFixtures;

beforeAll(() => {
  fixtures = {
    gistApi: new GistApi(),
  };
});

export function getFixtures(): GistFixtures {
  return fixtures;
}
