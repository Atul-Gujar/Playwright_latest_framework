//import {test, expect} from '@playwright/test';
//import { HomePage } from '../../pages/HomePage';
//import { ElementsPage } from '../../pages/ElementsPage';
import {
    test,
    expect
} from '../../fixtures/test.fixture';

test('Textbox Tests', async({homePage, elementsPage, textBoxPage}) => {
  //const homePage = new HomePage(page);
  //const elementsPage = new ElementsPage(page);

  await homePage.goto();

  await expect(homePage.page).toHaveTitle(/demosite/);

  await homePage.clickOnElementsLink();

  await expect(elementsPage.page).toHaveURL(/.*elements/);

  await elementsPage.clickOnTextboxLink();

  await expect(textBoxPage.page).toHaveURL(/.*text-box/);

  await textBoxPage.enterDetails("Atul","atul@gmail.com","Satara","Satara");

  const nameOutput : String = await textBoxPage.returnOutput();
 
  await expect(nameOutput).toBe("Atul");
   
});

