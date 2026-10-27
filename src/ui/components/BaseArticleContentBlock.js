import { BaseComponent } from './BaseComponent';

export class BaseArticleContentBlock extends BaseComponent {
  constructor(page, userId = 0) {
    super(page, userId);

    this.articleTitle = this.page.locator('.banner h1');
    this.articleAuthor = this.page.locator('.banner .article-meta .author');
    this.articleBody = this.page.locator('.article-content');
    this.articleTags = this.articleBody.locator('.tag-list li');
  }
}
