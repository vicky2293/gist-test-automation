import 'dotenv/config';

export const env = {
  githubBaseUrl: process.env.GITHUB_BASE_URL || 'https://api.github.com',
};
