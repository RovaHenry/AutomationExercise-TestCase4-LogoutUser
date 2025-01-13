const {Builder} = require('selenium-webdriver');

const DashboardPage = require ('./WebComponent/DashboardPage');
const LoginPage = require ('./WebComponent/LoginPage');
const LogoutPage = require ('./WebComponent/LogoutPage');

const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 4 [Logout]', function(){
    this.timeout(50000);
    let driver;

    switch (browser) {
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
        break;
    }

    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    it('Verify HomePage', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate(baseURL);
        const isLogoDisplayed = await dashboardPage.verifyLogoHome();
        if (isLogoDisplayed) {
            console.log("Homepage is visible successfully.");
        } else {
            console.log("Homepage is not visible.");
        }  
    });
    it('Verify Login page and try to login', async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.loginButton();
        const loginTitle = await loginPage.verifyLoginUpHeader();
        assert.strictEqual(loginTitle, 'Login to your account', 'We are not in login page');
        await loginPage.login(email, password);
        const loginVerif = await loginPage.verifyLoggedInUsername();
        assert.strictEqual(loginVerif, 'Logged in as Rova Henryawan', 'Login failed');
    });

    it('Verify Logout', async function () {
        const logout = new LogoutPage(driver);
        await logout.loginButton();
        const title = await logout.verifyLogout();
        assert.strictEqual(title, 'Login to your account', 'We are not in login page');
    });
    //Assertion atau validasi
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });
    
    after(async function () {
        await driver.quit()
    });
});