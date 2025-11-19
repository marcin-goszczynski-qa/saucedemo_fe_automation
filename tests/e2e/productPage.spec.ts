import { inventoryPageFixture as test } from './fixtures/inventoryPage.fixture';
import { expect } from '@playwright/test';
import { products } from '../../data/products';

test.describe.parallel('Product Page', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.inventoryList
      .getItemByName(products.backpack.name)
      .then((item) => item?.label.click());
  });

  test('product label, description and price should be displayed', async ({
    productPage,
  }) => {
    await productPage.verifyProductLabel(products.backpack.name);
    await productPage.verifyProductDescription(products.backpack.description);
    await productPage.verifyProductPrice(`${products.backpack.price}`);
  });

  test('product image should be displayed @visual', async ({
    inventoryPage,
    productPage,
  }) => {
    await productPage.backToProducts();
    for (const product of Object.values(products)) {
      await inventoryPage.waitForContainerVisible();
      await inventoryPage.openInventoryItem(product.name);
      await productPage.waitForLoad();
      await productPage.verifyImageSnapshot(`${product.name}.png`);
      await productPage.backToProducts();
    }
  });

  test('add to cart button exists and changes label when adding or removing product', async ({
    productPage,
  }) => {
    await expect(productPage.addToCartButton).toBeVisible();
    expect(await productPage.addToCartButton.textContent()).toBe('Add to cart');
    await productPage.addToCartButton.click();
    expect(await productPage.addToCartButton.textContent()).toBe('Remove');
    await productPage.addToCartButton.click();
    expect(await productPage.addToCartButton.textContent()).toBe('Add to cart');
  });

  test('add to cart button adds product to cart', async ({
    productPage,
    shoppingCartPage,
  }) => {
    await productPage.addToCartButton.click();
    await productPage.topBar.shoppingCartButton.click();
    await shoppingCartPage.verifyCartContent([products.backpack.name]);
  });

  test('add to cart and remove from cart is reflected in the cart badge', async ({
    productPage,
  }) => {
    await productPage.topBar.verifyShoppingCartBadgeHidden();
    await productPage.addToCartButton.click();
    await productPage.topBar.verifyShoppingCartBadgeVisible();
    await productPage.topBar.verifyShoppingCartBadgeValue(1);
    await productPage.addToCartButton.click();
    await productPage.topBar.verifyShoppingCartBadgeHidden();
  });

  test('user can go back to products with button', async ({
    productPage,
    inventoryPage,
  }) => {
    await productPage.backToProductsButton.click();
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });
});
