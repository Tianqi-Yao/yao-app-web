import { Browser, chromium, Page } from "playwright";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import {logger} from "@/app/lib/utils/logger";


async function operatingGrabSiteInfo(websiteURL: string, mainElement: string) {
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch();
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
    });
    const page: Page = await context.newPage();
    await Promise.race([
      page.goto(websiteURL, { waitUntil: "networkidle" }),
      new Promise((resolve) =>
        setTimeout(() => resolve(logger.info("waited 5 seconds")), 5000)
      ),
    ]);
    // ========= 核心代码 =========
    const screenshotPath = await takeScreenshot(page)
    const elementInfo = await takeMainElementInfo(page, mainElement)
    // ========= 核心代码 =========

    await browser.close();
    return { screenshotPath, elementInfo };
  } catch (error: unknown) {
    logger.warn(`warning: fetch "${websiteURL}" screenshot failed`);
    if (typeof browser !== "undefined") {
      await browser.close();
    }    
    throw error;
  }
}

async function takeScreenshot(page: Page) {
  const screenshot = await page.screenshot();
  const optimizedScreenshot = await sharp(screenshot).png({ quality: 90 }).toBuffer();
  const reletevPath = `/screenshots/screenshot.png`;
  const absolutePath = path.resolve(`./public${reletevPath}`);
  fs.writeFileSync(absolutePath, optimizedScreenshot);
  logger.info(`screenshotPath: ${absolutePath}`);
  return reletevPath;
}

async function takeMainElementInfo(page: Page, mainElement: string) {
  // 获取所有符合条件的元素
  const elements = await page.$$(mainElement);
  // 获取元素里的文本
  const elementInfo = await Promise.all(
    elements.map((element) => element.innerText())
  );
  // 截图元素
  await Promise.all(
    elements.map((element,i) => element.screenshot({ path: `./public/screenshots/subScreenshot/element${i}.png` }))
  );
  logger.debug("all text", elementInfo);
  return elementInfo;
}

export { operatingGrabSiteInfo };
