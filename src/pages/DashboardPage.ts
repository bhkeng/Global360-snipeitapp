import { Page, Locator, expect } from "@playwright/test";
import AssetCreateNewPage from './AssetCreateNewPage';
import AssetDetailPage from "./AssetDetailPage";

export default class DashboardPage {
    
    private readonly titleText = 'Dashboard';
    private readonly titleLocator : Locator;
    private readonly createNewDropdownSelector : Locator;
    private readonly assetDropDownItemSelector : Locator;
    private readonly assetSearchLocator: Locator;
    private readonly recentActivityRefreshLocator: Locator;
    private readonly recentActivityTableRowsLocator: Locator;
    private readonly recentActivityTableLocator: Locator;
    
    private getAssetLink(assetTag: string, laptopModel: string): Locator {
        return this.page.getByRole('cell', { name: ` (${assetTag}) - ${laptopModel}` }).getByRole('link').first();
    }
    constructor(private page: Page) {
        this.titleLocator = this.page.getByRole('heading', { name: this.titleText});
        this.createNewDropdownSelector = this.page.getByText('Create New', { exact: true });
        this.assetDropDownItemSelector = this.page.getByRole('navigation').getByText('Asset', { exact: true });
        this.assetSearchLocator = this.page.getByRole('searchbox', { name: 'Search' }).first();
        this.recentActivityRefreshLocator = this.page.getByRole('button', { name: 'Refresh' }).first()
        this.recentActivityTableRowsLocator = this.page.locator('table#dashActivityReport > tbody > tr');
        this.recentActivityTableLocator = this.page.locator('#dashActivityReport');
    }

    async expectTitleToBeVisible() {
        await expect(this.titleLocator).toBeVisible({ timeout: 15000 });
    }

    async navigateToAssets() {
        //Navigate to Assets and create a new asset
        await this.createNewDropdownSelector.click();
        await this.assetDropDownItemSelector.click();
        console.info("- navigate to create new asset page");
        // When we navigate to Assets, we can assume we want to return the assetCreateNewPage object
        const assetCreateNewPage = new AssetCreateNewPage(this.page)
        return assetCreateNewPage;
    }

    async findAndSelectAsset(assetTag: string, laptopModel: string) {
        // Fill in the search box with the asset number and click the refresh button
        await this.assetSearchLocator.fill(assetTag);
        await this.recentActivityRefreshLocator.click();
        // Assert that only 2 rows should be returned for the asset that was just created (create new and checkout Action)
        await expect(this.recentActivityTableRowsLocator).toHaveCount(2);
        // Assert that the asset number and actions are visible in the dashboard
        await expect(this.recentActivityTableLocator).toContainText(assetTag);
        await expect(this.recentActivityTableLocator).toContainText('create new');
        await expect(this.recentActivityTableLocator).toContainText('checkout');
        console.info('- verified asset has been created successfully')
        // Click on the asset link to view its details
        const assetLink = this.getAssetLink(assetTag, laptopModel);
        await assetLink.click();
        // When we navigate to Assets Detail, we can assume we want to return the AssetDetailPage object
        const assetDetailPage = new AssetDetailPage(this.page);
        return assetDetailPage;
    };
}