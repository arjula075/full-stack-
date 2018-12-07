const puppeteer = require('puppeteer')

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')
  await page.type('username', 'root')
  await page.type('password', 'sekret')
  await page.screenshot({ path: 'kuva.png' })

  await browser.close()
}

main()
