import { expect } from '@playwright/test';
import { loginPageFixture as test } from './fixtures/loginPage.fixture';

test.describe.parallel('Login Page', () => {
  test('should login with valid credentials', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.loginUser('standard_user', 'secret_sauce');
    await inventoryPage.waitForContainerVisible();
  });

  test('should not login locked out user', async ({ loginPage }) => {
    await loginPage.loginUser('locked_out_user', 'secret_sauce');
    await loginPage.verifyErrorMessage(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });

  test('should not login invalid credentials', async ({ loginPage }) => {
    await loginPage.loginUser('invalid', 'invalid');
    await loginPage.verifyErrorMessage(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  test('should not login with empty credentials', async ({ loginPage }) => {
    await loginPage.loginUser('', '');
    await loginPage.verifyErrorMessage('Epic sadface: Username is required');
  });

  test('Should not login without password', async ({ loginPage }) => {
    await loginPage.loginUser('standard_user', '');
    await loginPage.verifyErrorMessage('Epic sadface: Password is required');
  });
});
