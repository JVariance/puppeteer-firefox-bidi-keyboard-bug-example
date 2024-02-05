browser.commands.onCommand.addListener(async (command) => {

	switch (command) {
		case "test":
			const tabIds = await browser.tabs.query({ currentWindow: true });
			browser.tabs.update(tabIds[1].id, { url: 'https://www.duckduckgo.com' });
			break;
		default:
			break;
	}
});