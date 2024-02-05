import { expect, test } from "vitest";
import { ADDON_UUID, browser } from "./setup";
import { Page } from "puppeteer";

async function createAndGetSidebarPage() {
	const page = await browser.newPage();
	await page.goto(`moz-extension://${ADDON_UUID}/pages/sidebar.html`, {
		waitUntil: "domcontentloaded",
	});
	await page.bringToFront();

	return page;
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

test(
	"extension command on webpage",
	async () => {
		const page = await browser.newPage();
		await page.goto("https://qwant.com", { waitUntil: "domcontentloaded" });
		await page.bringToFront();
		await page.keyboard.down("Control");
		await page.keyboard.down("Alt");
		await page.keyboard.down("D");
		await page.keyboard.up("D");
		await page.keyboard.up("Alt");
		await page.keyboard.up("Control");
		await sleep(10000);
	},
	{ timeout: 30000 }
);

// test(
// 	"extension command on moz-extension page",
// 	async () => {
// 		const page = await createAndGetSidebarPage();
// 		await page.waitForSelector("ul");
// 		const list = await page.$("ul");

// 		await page.keyboard.down("Control");
// 		await page.keyboard.down("Alt");
// 		await page.keyboard.down("D");
// 		await page.keyboard.up("D");
// 		await page.keyboard.up("Alt");
// 		await page.keyboard.up("Control");
// 		await sleep(3000);
// 		const children = await list.$$("li");
// 		expect(children.length).toBe(3);
// 	},
// 	{ timeout: 30000 }
// );

// // test(
// // 	"extension command on moz-extension page 2",
// // 	async () => {
// // 		const page = await createAndGetSidebarPage();
// // 		await page.keyboard.down("Control");
// // 		await page.keyboard.down("Alt");
// // 		await page.keyboard.down("D");
// // 		await page.keyboard.up("D");
// // 		await page.keyboard.up("Alt");
// // 		await page.keyboard.up("Control");
// // 		await sleep(10000);
// // 	},
// // 	{ timeout: 30000 }
// // );