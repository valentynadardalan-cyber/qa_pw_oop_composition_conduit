import { BaseComponent } from './BaseComponent';
import { expect } from '../../common/helpers/pw';

export class ArticleFeedItem extends BaseComponent {
  #articles;

  constructor(page, userId = 0) {
    super(page, userId);
    this.#articles = this.page.locator('.article-preview');
  }

  article(title) {
    return this.#articles.filter({
      has: this.page.getByRole('heading', {
        name: `Article title: ${title}`,
        exact: true,
      }),
    });
  }

  async assertArticleVisible(title, description) {
    await this.step(`Assert '${title}' article is visible`, async () => {
      const article = this.article(title);

      await expect(article).toBeVisible();

      if (description !== undefined) {
        await expect(
          article.getByText(`Article description: ${description}`, {
            exact: true,
          }),
        ).toBeVisible();
      }
    });
  }

  async openArticle(title) {
    await this.step(`Open '${title}' article`, async () => {
      await this.article(title).locator('.preview-link').click();
    });
  }
}
