import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ExternalHomePage } from '../../../src/ui/pages/home/ExternalHomePage';

test.use({ contextsNumber: 2 });

test('Not logged in user can view another user article in Global Feed', async ({
  pages,
  user,
  articleWithoutTags,
}) => {
  test.setTimeout(90_000);

  await signUpUser(pages[0], user, 1);

  await createArticle(pages[0], articleWithoutTags, 1);

  const externalHomePage = new ExternalHomePage(pages[1], 2);

  await expect.poll(
    async () => {
      await externalHomePage.open();

      await externalHomePage.globalFeed.open();

      return await externalHomePage.globalFeed.articleFeedItem
        .article(articleWithoutTags.title)
        .count();
    },
    {
      intervals: [2_000, 5_000, 5_000],
      timeout: 60_000,
    },
  ).toBeGreaterThan(0);

  await externalHomePage.globalFeed.articleFeedItem.assertArticleVisible(
    articleWithoutTags.title,
    articleWithoutTags.description,
  );
});
