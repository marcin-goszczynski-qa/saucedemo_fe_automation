import { Page } from '@playwright/test';
import { TopBarPage } from './basePageComponents/topBarPage';
import { MenuPage } from './basePageComponents/menuPage';

export class BasePage {
  topBar: TopBarPage;
  menu: MenuPage;
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.topBar = new TopBarPage(page);
    this.menu = new MenuPage(page);
  }
}
