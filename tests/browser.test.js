const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
	let stack = await driver.findElement(By.id('top_of_stack')).getText();
	expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box', async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Bananer");
		await alert.accept();
	});
});

describe('Clicking "Poppa stacken!"', () => {
	it('should remove an item from the stack', async () => {
        //OBS: Kopia av testet vi fick bara för att lägga till ett item i stacken!
        let push = await driver.findElement(By.id('push'));
		await push.click();
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Bananer");
		await alert.accept();

        //Egen kod:
        //lägger till ett annat item
		await push.click();
		alert = await driver.switchTo().alert();
		await alert.sendKeys("Soja");
		await alert.accept();

        let stack = await driver.findElement(By.id('top_of_stack')).getText();
        expect(stack).toEqual("Soja");
        
        let pop = await driver.findElement(By.id('pop'));
        await pop.click();
        alert = await driver.switchTo().alert();
		await alert.accept();

        //Detta är felet i testet, eftersom om man inte peekar så kommer texten som står i "top_of_stack" forfarande vara det gamla ordet (det som tagits bort)
        //Därför ger detta felmeddelande! Kommenterar man bort nedan fungerar det.
        //let peek = await driver.findElement(By.id('peek'));
        //await peek.click();

        stack = await driver.findElement(By.id('top_of_stack')).getText();
        expect(stack).toEqual("Bananer");
	});
});