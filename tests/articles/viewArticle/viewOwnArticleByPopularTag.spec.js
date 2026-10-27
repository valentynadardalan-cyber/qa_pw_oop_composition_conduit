import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test('Logged-in user can find own article by tag in Tag Feed', async ({
  page,
  user,
  internalHomePage,
  articleWithOneTag,
}) => {
  await signUpUser(page, user);

  await createArticle(page, articleWithOneTag);

  await internalHomePage.open();

  const tagName = articleWithOneTag.tags[0];

  await internalHomePage.popularTags.openTag(tagName);

  await internalHomePage.tagFeed.assertTagFeedVisible(tagName);

  await internalHomePage.tagFeed.articleFeedItem.assertArticleVisible(
    articleWithOneTag.title,
    articleWithOneTag.description,
  );
});
