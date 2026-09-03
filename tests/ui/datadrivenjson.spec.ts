import users from '../../data/user.json';

import {
    test,
    expect
} from '../../fixtures/test.fixture';

for(const user of users) {

test(`Textbox_Tests - ${user.fullName}`, async({homePage, elementsPage, textBoxPage}) => {
  //const homePage = new HomePage(page);
  //const elementsPage = new ElementsPage(page);

  await homePage.goto();

  await expect(homePage.page).toHaveTitle(/demosite/);

  await homePage.clickOnElementsLink();

  await expect(elementsPage.page).toHaveURL(/.*elements/);

  await elementsPage.clickOnTextboxLink();

  await expect(textBoxPage.page).toHaveURL(/.*text-box/);

  await textBoxPage.enterDetails(user.fullName,user.email,user.currentAddress,user.permenentAddress);

  const nameOutput : String = await textBoxPage.returnOutput();
 
  await expect(nameOutput).toBe(user.fullName);
   
});

}