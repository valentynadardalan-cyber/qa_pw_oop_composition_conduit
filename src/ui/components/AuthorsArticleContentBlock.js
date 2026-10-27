import { BaseArticleContentBlock } from './BaseArticleContentBlock';
import { expect } from '../../common/helpers/pw';

export class AuthorsArticleContentBlock extends BaseArticleContentBlock {
  constructor(page, userId = 0) {
    super(page, userId);

    this.editArticleLink = this.page
      .getByRole('link', { name: 'Edit Article' })
      .first();

    this.deleteArticleButton = this.page
      .getByRole('button', { name: 'Delete Article' })
      .first();
  }

  async assertAuthorActionsVisible() {
    await this.step(`Assert author actions are visible`, async () => {
      await expect(this.editArticleLink).toBeVisible();
      await expect(this.deleteArticleButton).toBeVisible();
    });
  }
}
