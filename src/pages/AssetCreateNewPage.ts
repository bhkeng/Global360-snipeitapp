import { Page, Locator, expect } from "@playwright/test";
import { TestUtils } from "../utils/testUtils";

export default class AssetCreateNewPage {
    
    private readonly titleText = 'Create New';
    private readonly titleLocator : Locator;
    private readonly companyPlaceholderText = 'Select Company';
    private readonly companyLocator : Locator;
    private readonly pickCompanyLocator : Locator;
    private selectedCompany : string; 
    private readonly assetTagLocator : Locator;
    private assetTag: string;
    private laptopModel : string;
    private readonly modelPlaceholderText = 'Select a Model';
    private readonly modelLocator : Locator;
    private readonly statusPlaceholderText = "Select Status";
    private readonly statusLocator : Locator;
    private readonly userPlaceholderText = 'Select a User';
    private readonly userLocator : Locator;
    private readonly userOptions : Locator;
    private readonly saveAssetButton : Locator;
    
    private getLaptopField(laptopModelFullName: string): Locator {
        return this.page.getByText(laptopModelFullName);
    };

    private getStatusField(selectStatus: string): Locator {
        return this.page.getByRole('option', { name: selectStatus });
    };

    constructor(private page: Page) {
        this.titleLocator = this.page.locator('#setting-list').getByText(this.titleText);
        this.companyLocator = this.page.getByRole('combobox', { name: this.companyPlaceholderText });
        this.pickCompanyLocator = this.page.getByRole('option').nth(1);  // always select 2nd company in the list
        this.assetTagLocator = this.page.getByRole('textbox', { name: 'Asset Tag', exact: true });
        this.modelLocator = this.page.getByRole('combobox', { name: this.modelPlaceholderText });
        this.statusLocator = this.page.getByRole('combobox', { name: this.statusPlaceholderText });
        this.userLocator = this.page.getByRole('combobox', { name: this.userPlaceholderText });
        this.userOptions = this.page.locator('.select2-results__option:not(.select2-results__option--load-more)');
        this.saveAssetButton = this.page.locator('#submit_button');
    };

    async expectTitleToBeVisible() {
        await expect(this.titleLocator).toBeVisible({ timeout: 15000 });
    };

    async fillCompany() {
        // Fill in the company
        // Note: The company list is dynamic and seem to change randomly so I can't data drive the company name, decided to always select the 2nd company in the list
        await this.companyLocator.click(); // Open the Select Company combo box
        const pickCompany = this.pickCompanyLocator;  // select the 2nd company in the list
        this.selectedCompany = await pickCompany.innerText(); // Get and store the name of the company selected
        await this.pickCompanyLocator.click();
        console.info(`- company selected: ${this.selectedCompany}`);
        return this.selectedCompany; // Return the selected company name
    };

    async fillAssetTag() {
        // Fill in the asset tag
        this.assetTag = TestUtils.generateRandomAssetTag(); // get a random asset tag
        console.info(`- asset tag entered: ${this.assetTag}`);
        await this.assetTagLocator.fill(this.assetTag); // populate the asset tag field with the random asset tag number
        return this.assetTag; // Return the asset tag
    };

    async fillModel(modelFullName: string) {
        // Fill in the model
        await this.modelLocator.click(); // Open the Select a Model combo box
        const modelFullNameLink = this.getLaptopField(modelFullName); // Select model
        await modelFullNameLink.click();
        this.laptopModel = modelFullName.split(' - ')[1]; // to get only laptop model name and don't include the category
        console.info(`- model selected: ${this.laptopModel}`);
        return this.laptopModel; // Return the model
    };

    async fillStatus(selectStatus: string) {
        // Fill in Status
        await this.statusLocator.click(); // Open the Select Status combo box
        const selectedStatusLink = this.getStatusField(selectStatus); // Select the status
        await selectedStatusLink.click();
        console.info(`- status selected: ${selectStatus}`);
    };

    async fillUser() {
        // Fill in user by picking a random user
        await this.userLocator.click(); // Open Select User combo box
        await this.page.waitForTimeout(2000); // Wait for the dropdown to fully load, I had to use this  workaround for the dropdown fully loading fast enough sometimes
        const optionCount = await this.userOptions.count(); // Get the count of options available in the dropdown
        console.info(`- total user options available: ${optionCount}`);
        const randomIndex = TestUtils.generateRandomOptionNumber(optionCount); // Generate a random index based on the number of options available
        console.info(`- random user option index selected: ${randomIndex}`);
        const selectedUser = await this.userOptions.nth(randomIndex).innerText(); // Get the text of the randomly selected user
        await this.userOptions.nth(randomIndex).click(); // Click the randomly selected user
        console.info(`- user selected: ${selectedUser}`);
        return selectedUser; // Return the selected user
    };

    async saveAsset() {
        // Click the save button to save the asset
        await this.saveAssetButton.click()
    }
}