import { expect, Locator } from '@playwright/test';

const selectors = {
  label: 'div.inventory_item_name',
  description: 'div.inventory_item_desc',
  image: 'div.inventory_item_img img',
  price: 'div.inventory_item_price',
  addToCartButton: 'button.btn_inventory',
};

export class InventoryCard {
  container: Locator;
  label: Locator;
  image: Locator;
  description: Locator;
  price: Locator;
  addToCartButton: Locator;

  constructor(cardContainer: Locator) {
    this.container = cardContainer;
    this.label = this.container.locator(selectors.label);
    this.image = this.container.locator(selectors.image);
    this.description = this.container.locator(selectors.description);
    this.price = this.container.locator(selectors.price);
    this.addToCartButton = this.container.locator(selectors.addToCartButton);
  }

  async verifyLabel(expectedLabel: string) {
    await expect(this.label).toHaveText(expectedLabel);
  }

  async verifyDescription(expectedDescription: string) {
    await expect(this.description).toHaveText(expectedDescription);
  }

  async verifyPrice(expectedPrice: string) {
    await expect(this.price).toHaveText(expectedPrice);
  }

  async verifyAddToCartButtonEnabled() {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
  }

  async verifyAddToCartButtonText(expectedText: string) {
    await expect(this.addToCartButton).toHaveText(expectedText);
  }

  async addToCartButtonClick() {
    await this.addToCartButton.click();
  }
}
