import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { TestUtils } from '../utils/testUtils';

test.describe('Automatic retry test(s)', () => {
  // Retries any test that fails in this test.describe block in case the test is flaky.
  test.describe.configure({ retries: 1 });

  test('create and validate new asset', async ({ page }) => {
    // This test logs the user into the Snape-IT application, creates a new asset and then to verify the newly
    // created asset was successful it searches for the asset and verifies the asset's detail and history.

    const modelFullName = 'Laptops - Macbook Pro 13\"';
    const selectStatus = "Ready to Deploy";
    let selectedCompany : string;
    let assetTag : string;
    let laptopModel : string;
    let selectedUser : string;

    // *************************************************************
    //Login to the snipeit demo at https://demo.snipeitapp.com/login
    // *************************************************************
    console.info('***Login to the snipeit demo at https://demo.snipeitapp.com/login');
    
    // Login to the application
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(process.env.USERNAME!);
    await loginPage.fillPassword(process.env.PASSWORD!);
    const dashboardPage = await loginPage.clickLoginButton();
    await dashboardPage.expectTitleToBeVisible(); // Validate that you are successfully on Dashboard page
    
    //Navigate to create new assets
    const assetCreateNewPage = await dashboardPage.navigateToAssets();
    await assetCreateNewPage.expectTitleToBeVisible(); // Validate that you are successuflly on Asset Create New page

    // **************************************************************************************************
    //Create a new Macbook Pro 13" asset with the ready to deploy status and checked out to a random user
    // **************************************************************************************************
    console.info('***Create a new Macbook Pro 13" asset with the ready to deploy status and checked out to a random user');

    // Fill in company, note that the company list seem to be dynamic and changes randomly, so we always just select the 2nd company in the list
    // Otherwise i could have made it data driven and implemented assetCreateNewPage.fillCompany(aCompanyName)
    selectedCompany = await assetCreateNewPage.fillCompany(); 
    // Fill in the asset tag, note that the asset tag is generated randomly
    assetTag = await assetCreateNewPage.fillAssetTag(); 
    // Fill in the model, this is data driven to pick Macbook Pro 13"
    laptopModel = await assetCreateNewPage.fillModel(modelFullName);
    // Fill in the status, this is data driven to pick "Ready to Deploy"
    await assetCreateNewPage.fillStatus(selectStatus);
    // Fill in user by picking a random user from dropdown
    selectedUser = await assetCreateNewPage.fillUser();
    // Convert selected user's name from "Last, First (xxxx..." to "First Last" only and stripping out all extra characters
    const selectedUserFirstLastName = TestUtils.formatNameToFirstLast(selectedUser); 
    console.info(`- user first last name: ${selectedUserFirstLastName}`);  
    // Save the new asset
    await assetCreateNewPage.saveAsset();

    // ***************************************************************************************
    //Find the asset you just created in the assets list to verify it was created successfully
    // ***************************************************************************************
    console.info('***Find the asset you just created in the assets list to verify it was created successfully');

    // Fill in the search box with the asset number to find asset and click on asset link to view its details
    const assetDetailPage = await dashboardPage.findAndSelectAsset(assetTag, laptopModel);
    await assetDetailPage.expectTitleToBeVisible(); // Validate that you are successfully on Asset Detail page
    
    // **********************************************************************************************
    // Navigate to the asset page from the list and validate relevant details from the asset creation
    // **********************************************************************************************
    console.info('***Navigate to the asset page from the list and validate relevant details from the asset creation');

    // Verify the asset details matches the asset that you just created
    await assetDetailPage.verifyAssetInfo(assetTag, selectedUserFirstLastName, selectedCompany, modelFullName);

    // ***********************************************************
    // Validate the details in the "History" tab on the asset page
    // ***********************************************************
    console.info('***Validate the details in the "History" tab on the asset page');

    // Verify the asset history
    await assetDetailPage.verifyAssetHistory(assetTag, selectedUserFirstLastName, laptopModel)
    console.info('TEST COMPLETED SUCCESSFULLY!')

  });

});