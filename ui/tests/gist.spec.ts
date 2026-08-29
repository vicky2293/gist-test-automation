import { test } from '../fixtures/fixture.js';

test.describe('gist', () => {
  test('Verify whether public gist is visible for unauthorized user.', async ({ gistHomePage }) => {
    await gistHomePage.visitGistHomePage();
    await gistHomePage.verifyPageTitle('Discover gists · GitHub');
    await gistHomePage.visitCreatedPublicGist(
      'https://gist.github.com/vicky2293/64ccaca2be6076675f702cdd924d34ca',
    );
    await gistHomePage.verifyGistHeading(`vicky2293/Gist Public - Test`);
    await gistHomePage.verifyGistFileName('#file-gist-public-test');
  });
});
