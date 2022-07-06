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
    await driver.sleep(5000);
    await driver.executeScript("window.scrollBy(0,500)");
    await driver.findElement(By.id("ver-mas")).click()
    await driver.sleep(3000);
    await driver.executeScript("window.scrollBy(0,650)");
    await driver.findElement(By.id("boton-reserva")).click();
    await driver.sleep(3000);
    await driver.findElement(By.id("ciudad")).sendKeys("Posadas");
    await driver.findElement(By.css('#hora>option:nth-child(2)')).click();
    await driver.findElement(By.name("covid")).click();
    await driver.executeScript("window.scrollTo(0,250)")
    await driver.findElement(By.xpath("/html/body/div/div[4]/div[2]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[2]/button[25]")).click();
    await driver.findElement(By.xpath("/html/body/div/div[4]/div[2]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[2]/button[26]")).click();
    await driver.executeScript("window.scrollBy(0,650)");
    await driver.findElement(By.xpath("//*[@id='root']/div[4]/div[2]/div[2]/div/div[7]/button")).click();
    await driver.sleep(30000);
}






TC_001();
