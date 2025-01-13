const {By} = require('selenium-webdriver');

class RegisterPage {
    constructor(driver) {
        this.driver = driver;
        this.loginMenu = By.css("[href='/login']");
        this.emailInput = By.css("[data-qa='login-email']");
        this.passwordInput = By.css("[name='password']");
        this.loginInput = By.css("[data-qa='login-button']");
        this.loginHeader = By.css(".login-form > h2");
        this.loggedInUsername = By.xpath("//a[contains(.,'Logged in as Rova Henryawan')]");
    }

    async loginButton() {
        await this.driver.findElement(this.loginMenu).click();
    }

    async login(email, password) {
        await this.driver.findElement(this.emailInput).sendKeys(email);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginInput).click();
    }

    async verifyLoginUpHeader() {
        const title = await this.driver.findElement(this.loginHeader).getText();
        return title;
    }
    async verifyLoggedInUsername() {
        const title = await this.driver.findElement(this.loggedInUsername).getText();
        return title;
    }
}

module.exports = RegisterPage;