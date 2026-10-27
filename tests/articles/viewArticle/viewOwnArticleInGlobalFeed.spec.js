import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test('Logged-in user can view own article in Global Feed', async ({
  page,
  user,
  internalHomePage,
  articleWithoutTags,
}) => {
  await signUpUser(page, user);

  await createArticle(page, articleWithoutTags);

  await internalHomePage.open();

  await internalHomePage.globalFeed.open();

  await internalHomePage.globalFeed.articleFeedItem.assertArticleVisible(
    articleWithoutTags.title,
    articleWithoutTags.description,
  );
});
