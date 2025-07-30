import { Page, Locator, expect } from "@playwright/test";

export default class AssetDetailPage {
    
    private readonly titleText = 'Assets';
    private readonly titleLocator : Locator;
    private readonly assetTagField : Locator;
    private readonly statusField : Locator;
    private readonly companyField : Locator;
    private readonly categoryField : Locator;
    private readonly modelField: Locator;
    private readonly assetHistoryTab: Locator;
    private readonly assetHistoryTable : Locator;

    constructor(private page: Page) {
        this.titleLocator = this.page.locator('h1').getByRole('link', { name: this.titleText })
        this.assetTagField = page.locator('div:nth-child(1) > .col-md-9 > .js-copy-assettag');
        this.statusField = page.locator('div:nth-child(2) > .col-md-9');
        this.companyField = page.locator('div:nth-child(3) > .col-md-9');
        this.categoryField = page.locator('div:nth-child(6) > .col-md-9');
        this.modelField = page.locator('div:nth-child(7) > .col-md-9');
        this.assetHistoryTab = page.getByRole('link', { name: 'History' })
        this.assetHistoryTable = page.locator('#assetHistory');
    }

    async expectTitleToBeVisible() {
        await expect(this.titleLocator).toBeVisible({ timeout: 15000 });
    };

    async verifyAssetInfo(assetTag: string, selectedUserFirstLastName: string, selectedCompany: string, modelFullName: string) {
        // Verify the asset details
        await expect(this.assetTagField).toContainText(assetTag); // verfiy asset tag matches
        await expect(this.statusField).toContainText(`Ready to Deploy Deployed ${selectedUserFirstLastName}`); // verify status and name matches
        await expect(this.companyField).toContainText(selectedCompany); // verify company matches
        const categoryType = modelFullName.split('-')[0].trim(); // just extract the category
        await expect(this.categoryField).toContainText(categoryType); // verify category matches
        const laptopModel = modelFullName.split(' - ')[1]; // just extract the model
        await expect(this.modelField).toContainText(laptopModel); // verify model matches
        console.info('- verfied created asset info successfully')
    };

    async verifyAssetHistory(assetTag: string, selectedUserFirstLastName: string, laptopModel: string) {
        // Verify the asset history
        await this.assetHistoryTab.click(); // Navigate to history tab first
        await expect(this.assetHistoryTable).toContainText('create new'); // verify 1st action matches
        await expect(this.assetHistoryTable).toContainText('checkout'); // verify 2nd action matches
        await expect(this.assetHistoryTable).toContainText(`(${assetTag}) - ${laptopModel}`); // verify item matches
        await expect(this.assetHistoryTable).toContainText(selectedUserFirstLastName); // verify target (i.e. name) matches
        console.info('- verified asset history details successfully')
    };
}