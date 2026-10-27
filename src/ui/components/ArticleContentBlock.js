import { BaseArticleContentBlock } from './BaseArticleContentBlock';
import { expect } from '../../common/helpers/pw';

export class ArticleContentBlock extends BaseArticleContentBlock {
  async assertArticleTitleIsVisible(title) {
    await this.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitle).toHaveText(title);
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await this.step(
      `Assert the article has correct author username`,
      async () => {
        await expect(this.articleAuthor).toHaveText(username);
      },
    );
  }

  async assertArticleTextIsVisible(text) {
    await this.step(`Assert the article has correct text`, async () => {
      await expect(this.articleBody).toContainText(text);
    });
  }

  async assertArticleTagsAreVisible(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      for (const tag of tags) {
        await expect(
          this.articleBody.getByText(tag, { exact: true }),
        ).toBeVisible();
      }
    });
  }
}
