import { BaseComponent } from './BaseComponent';
import { ArticleFeedItem } from './ArticleFeedItem';
import { expect } from '../../common/helpers/pw';

export class TagFeedTab extends BaseComponent {
  #tagFeedTab;

  constructor(page, userId = 0) {
    super(page, userId);
    this.#tagFeedTab = this.page.locator('.feed-toggle .nav-link.active');
    this.articleFeedItem = new ArticleFeedItem(this.page, userId);
  }

  async assertTagFeedVisible(tagName) {
    await this.step(`Assert '${tagName}' tag feed is visible`, async () => {
      await expect(this.#tagFeedTab).toContainText(tagName);
    });
  }
}
