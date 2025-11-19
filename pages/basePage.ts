import { Page } from '@playwright/test';
import { TopBarPage } from './basePageComponents/topBarPage';
import { MenuPage } from './basePageComponents/menuPage';

export class BasePage {
  page: Page;
  topBar: TopBarPage;
  menu: MenuPage;

  constructor(page: Page) {
    this.page = page;
    this.topBar = new TopBarPage(page);
    this.menu = new MenuPage(page);
  }
}
