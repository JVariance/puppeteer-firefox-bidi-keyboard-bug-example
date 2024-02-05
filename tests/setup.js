import { afterEach, beforeEach } from "vitest";
import { firefox } from "playwright-firefox";
import puppeteer from "puppeteer";
import path from "path";
import { connect } from "./node_modules/web-ext/lib/firefox/remote.js";
import getPort from "get-port";
import fs from "node:fs";

export let browser;

// https://github.com/mozilla/web-ext/issues/1927#issuecomment-1397225305
export const ADDON_UUID = "eb7c9a05-56f8-47bf-9c14-2c7da7529a02";
const ADDON_ID = JSON.parse(
	fs.readFileSync(path.join("../extension", "manifest.json"))
).browser_specific_settings.gecko.id;

beforeEach(async () => {
	const rppPort = await getPort();
	browser = await puppeteer.launch({
		headless: false,
		product: "firefox",
		protocol: "webDriverBiDi",
		args: [`--start-debugger-server=${rppPort}`],
		extraPrefsFirefox: {
			"devtools.chrome.enabled": true,
			"devtools.debugger.prompt-connection": false,
			"devtools.debugger.remote-enabled": true,
			"toolkit.telemetry.reportingpolicy.firstRun": false,
			"extensions.webextensions.uuids": `{"${ADDON_ID}": "${ADDON_UUID}"}`,
			"remote.log.level": "Trace",
		},
		executablePath: firefox.executablePath(),
		dumpio: true,
	});

	const rdp = await connect(rppPort);
	await rdp.installTemporaryAddon(path.resolve("../extension"));
});

afterEach(async () => {
	await browser.close();
	browser = undefined;
});