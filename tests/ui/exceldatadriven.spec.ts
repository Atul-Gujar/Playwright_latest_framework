import path from 'path';
import { test, expect } from '../../fixtures/test.fixture';
import { ExcelReader } from '../../utils/ExcelReader';
import { UserData } from '../../types/userData';

// Resolve file path safely from process working directory
const filePath = path.resolve(process.cwd(), 'data/testData.xlsx');

// Read test data array
const users = ExcelReader.readExcel<UserData>(filePath, 'Sheet1');

for (const user of users) {
  test(`Textbox Tests - ${user.fullName}`, async ({ homePage, elementsPage, textBoxPage }) => {
    await homePage.goto();
    await expect(homePage.page).toHaveTitle(/demosite/);

    await homePage.clickOnElementsLink();
    await expect(elementsPage.page).toHaveURL(/.*elements/);

    await elementsPage.clickOnTextboxLink();
    await expect(textBoxPage.page).toHaveURL(/.*text-box/);

    // Fixed spelling: user.permanentAddress
    await textBoxPage.enterDetails(
      user.fullName,
      user.email,
      user.currentAddress,
      user.permanentAddress 
    );

    // Fixed primitive type annotation
    const nameOutput: string = await textBoxPage.returnOutput();

    // Synchronous expect (NO await for string equality)
    expect(nameOutput).toContain(user.fullName); 
  });
}