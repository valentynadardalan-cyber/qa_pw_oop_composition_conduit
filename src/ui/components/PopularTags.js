import { BaseComponent } from './BaseComponent';

export class PopularTags extends BaseComponent {
  #tagsList;

  constructor(page, userId = 0) {
    super(page, userId);
    this.#tagsList = this.page.locator('.sidebar .tag-list');
  }

  async openTag(tagName) {
    await this.step(`Open '${tagName}' tag`, async () => {
      await this.#tagsList.getByText(tagName, { exact: true }).click();
    });
  }
}