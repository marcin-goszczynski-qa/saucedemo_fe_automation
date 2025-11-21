import { loginPageFixture as test } from './fixtures/loginPage.fixture';

const USER_NAME = process.env.USER_NAME ?? '';
const USER_PASSWORD = process.env.USER_PASSWORD ?? '';
const LOCKED_USER = 'locked_out_user';

test.describe.parallel('Login Page', () => {
  test('should login with valid credentials', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.loginUser(USER_NAME, USER_PASSWORD);
    await inventoryPage.waitForContainerVisible();
  });

  test('should not login locked out user', async ({ loginPage }) => {
    await loginPage.loginUser(LOCKED_USER, USER_PASSWORD);
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
    await loginPage.loginUser(USER_NAME, '');
    await loginPage.verifyErrorMessage('Epic sadface: Password is required');
  });
});
