const { Builder, Capabilities, By } = require('selenium-webdriver');
const chromeCapabilities = Capabilities.chrome();
const assert = require('assert');

async function TC_001(){
    chromeCapabilities.set('chromeOptions', {args: ['--headless']});
    let driver = await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();

    await driver.get('http://g1-sixvago-web.s3-website-us-east-1.amazonaws.com/');
    await driver.manage().window().maximize();

    await driver.sleep(1000);

    await driver.findElement(By.id("iniciar")).click();
    await driver.sleep(3000);
    await driver.findElement(By.id("userEmail")).sendKeys("guido@yopmail.com");
    await driver.findElement(By.id("userPassword")).sendKeys('123456');
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    await driver.sleep(7000);
    await driver.findElement(By.linkText("Ver más")).click();
    await driver.sleep(5000);
    await driver.findElement(By.id("boton-reserva")).click();
}






TC_001();
