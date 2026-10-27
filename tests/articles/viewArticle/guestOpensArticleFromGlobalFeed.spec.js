import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ExternalHomePage } from '../../../src/ui/pages/home/ExternalHomePage';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/ExternalViewArticlePage';

test.use({ contextsNumber: 2 });

test('Not logged in user can open another user article from Global Feed', async ({
  pages,
  user,
  articleWithoutTags,
}) => {
  test.setTimeout(90_000);

  await signUpUser(pages[0], user, 1);

  await createArticle(pages[0], articleWithoutTags, 1);

  const externalHomePage = new ExternalHomePage(pages[1], 2);
  const externalViewArticlePage = new ExternalViewArticlePage(pages[1], 2);

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

  await externalHomePage.globalFeed.articleFeedItem.openArticle(
    articleWithoutTags.title,
  );

  await expect(pages[1]).toHaveURL(articleWithoutTags.url);

  await externalViewArticlePage.articleContentBlock.assertArticleTitleIsVisible(
    articleWithoutTags.title,
  );

  await externalViewArticlePage.articleContentBlock.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );

  await externalViewArticlePage.articleContentBlock
  .assertArticleAuthorNameIsVisible(
    user.username,
  );
});