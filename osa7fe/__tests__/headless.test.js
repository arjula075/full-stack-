const puppeteer = require('puppeteer')

test ('first test', async () => {
  let browser = await puppeteer.launch({
    headless: false,
  })
  let page = await browser.newPage()
  await page.goto('http://localhost:3000')
  await page.waitForSelector('.title')

  const html = await page.$eval('.title', e = e.innerHtml)
  expect(html).toBe('React App')
})
