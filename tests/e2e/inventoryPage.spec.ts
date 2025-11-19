import { expect } from '@playwright/test';
import { inventoryPageFixture as test } from './fixtures/inventoryPage.fixture';
import { products } from '../../data/products';

test.describe.parallel('Inventory Page', () => {
  test('Products are displayed with proper labels, description and price', async ({
    inventoryPage,
  }) => {
    const items = await inventoryPage.inventoryList.getItems();
    expect(items.length).toBe(6);
    for (const product of Object.values(products)) {
      const item = await inventoryPage.inventoryList.getItemByName(
        product.name,
      );
      await item.verifyLabel(product.name);
      await item.verifyDescription(product.description);
      await item.verifyPrice(`\$${product.price}`);
    }
  });

  test('add to cart button is displayed for each product', async ({
    inventoryPage,
  }) => {
    const items = await inventoryPage.inventoryList.getItems();
    for (const item of items) {
      await item.verifyAddToCartButtonEnabled();
    }
  });

  test('add to cart button changes label when adding or removing product', async ({
    inventoryPage,
  }) => {
    const item = await inventoryPage.inventoryList.getItemByName(
      products.backpack.name,
    );
    await item.verifyAddToCartButtonText('Add to cart');
    await item.addToCartButtonClick();
    await item.verifyAddToCartButtonText('Remove');
    await item.addToCartButtonClick();
    await item.verifyAddToCartButtonText('Add to cart');
  });

  test('add to cart button adds product to cart', async ({
    inventoryPage,
    shoppingCartPage,
  }) => {
    const item = await inventoryPage.inventoryList.getItemByName(
      products.backpack.name,
    );
    await item.addToCartButtonClick();
    await inventoryPage.topBar.openShoppingCart();
    await shoppingCartPage.verifyCartContent([products.backpack.name]);
  });

  test('add to cart and remove from cart is reflected in the cart badge', async ({
    inventoryPage,
  }) => {
    await inventoryPage.topBar.verifyShoppingCartBadgeHidden();
    const items = await inventoryPage.inventoryList.getItems();
    let count = 1;
    for (const item of items) {
      await item.addToCartButtonClick();
      await inventoryPage.topBar.verifyShoppingCartBadgeValue(count);
      count++;
    }
    count = 6;
    for (const item of items) {
      await item.addToCartButtonClick();
      count--;
      if (count === 0) {
        await inventoryPage.topBar.verifyShoppingCartBadgeHidden();
      } else {
        await inventoryPage.topBar.verifyShoppingCartBadgeValue(count);
      }
    }
  });

  test('user can click on label and open product page', async ({
    inventoryPage,
    productPage,
  }) => {
    const item = await inventoryPage.inventoryList.getItemByName(
      products.backpack.name,
    );
    await item.label.click();
    await productPage.waitForLoad();
    await productPage.verifyProductLabel(products.backpack.name);
    await productPage.backToProductsButton.click();
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });
});
