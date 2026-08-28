import 'dotenv/config';

export const env = {
  githubBaseUrl: process.env.GITHUB_BASE_URL || 'https://api.github.com',
  githubToken: process.env.GITHUB_TOKEN || '',
  githubFineGrainedToken: process.env.GITHUB_FGTOKEN || '',
};
