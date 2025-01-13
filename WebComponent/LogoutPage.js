const {By} = require('selenium-webdriver');

class LogoutPage {
    constructor(driver) {
        this.driver = driver;
        this.logoutButton = By.css("[href='/logout']");
        this.verifyLogoutPage = By.xpath("//h2[.='Login to your account']");
    }

    async loginButton() {
        await this.driver.findElement(this.logoutButton).click();
    }
    async verifyLogout() {
        const title = await this.driver.findElement(this.verifyLogoutPage).getText();
        return title;
    }
}

module.exports = LogoutPage;