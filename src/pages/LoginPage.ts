import { Page, expect } from '@playwright/test';
import { env } from '../utils/env';
import DashboardPage from './DashboardPage';

export default class LoginPage {

    private readonly usernameInputSelector = '#username';
    private readonly passwordInputSelector = '#password';
    private readonly loginButtonSelector = '#submit';

    constructor(private page: Page) {}

    async navigateToLoginPage(){
    //    await this.page.goto('/');
        await this.page.goto(env.baseUrl)
    };
    async fillUsername(username: string){
        await this.page.locator(this.usernameInputSelector).fill(username);
    };

    async fillPassword(password: string){
        await this.page.locator(this.passwordInputSelector).fill(password);
    };

    async clickLoginButton(){
        //Click on login button and handle log if succesful or there is error
        await this.page
            .locator(this.loginButtonSelector)
            .click()
            .catch((error) => {
                console.error(`- error clicking login button: ${error}`);
                throw error; // rethrow the error if needed
            })
            .then(() => console.info("- clicked login button"));
        
        // Check if there is error message on screen
        try{
            await expect(this.page.getByText(/The username or password is incorrect./)).not.toBeVisible();
            await expect(this.page.getByText(/Please check the form below for errors/)).not.toBeVisible();
        } catch (error) {
        console.error("- login unsuccessful, there is a login error");
        throw error; // rethrow the error if needed
        }

        console.info("- login successful, no error message found");

        // When we click login, we can assume we want to return the DashboardPage object
        const dashboardPage = new DashboardPage(this.page);
        return dashboardPage;
        };
}