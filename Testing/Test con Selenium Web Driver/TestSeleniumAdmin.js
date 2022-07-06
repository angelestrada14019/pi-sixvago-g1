const { Builder, Capabilities, By } = require('selenium-webdriver');
const chromeCapabilities = Capabilities.chrome();

const assert = require('assert');

async function TC_001(){
    chromeCapabilities.set('chromeOptions', {args: ['--headless']});
    let driver = await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();
    await driver.manage().window().maximize();
    await driver.get('http://g1-sixvago-web.s3-website-us-east-1.amazonaws.com/');
    await driver.sleep(3000);
    await driver.findElement(By.id("iniciar")).click();
    await driver.sleep(3000);
    await driver.findElement(By.id("userEmail")).sendKeys("angelj.estradaa@ecci.edu.co");
    await driver.findElement(By.id("userPassword")).sendKeys('jesus');
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    await driver.sleep(5000);
    await driver.get('http://g1-sixvago-web.s3-website-us-east-1.amazonaws.com/administracion');
    

    await driver.findElement(By.id("propiedad-nombre")).sendKeys("Hotel de Testing");
    await driver.findElement(By.id("propiedad-direccion")).sendKeys("Avenida Corriente 2345");
    await driver.findElement(By.id("text")).sendKeys("Hotel hecho para los mejores testers de todos los tiempos.");
    await driver.findElement(By.name("habitaciones")).sendKeys("5");
    await driver.findElement(By.name("latitud")).sendKeys("-27.490478704184312");
    await driver.findElement(By.name("longitud")).sendKeys("-58.8339701965845");
    await driver.executeScript("window.scrollBy(0,800)");
    await driver.sleep(3000);
    await driver.findElement(By.name("fa-solid fa-wifi")).click();
    await driver.findElement(By.name("fa-solid fa-shield")).click();
    await driver.executeScript("window.scrollBy(0,400)");
    await driver.findElement(By.xpath("//input[@value='Se aceptan tarjetas de crédito']")).click();
    await driver.executeScript("window.scrollBy(0,850)");
    await driver.findElement(By.xpath("//input[@value='Prohíbase el expendio de bebidas embriagantes a menores de edad']")).click();
    await driver.executeScript("window.scrollBy(0,500)");
    await driver.findElement(By.xpath("//input[@value='Para cualquier cancelacion se debera efectuar con periodo minimo de 72hs de anticipacion']")).click();
    await driver.executeScript("window.scrollBy(0,900)");
    await driver.findElement(By.id("cargaImagen")).sendKeys("https://memoflores.com/fotos-de-hoteles-10.jpg");
    await driver.findElement(By.id("boton-crear")).click();

}

TC_001();