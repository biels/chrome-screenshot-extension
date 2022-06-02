chrome.runtime.onInstalled.addListener(async () => {
  let url = chrome.runtime.getURL("main.html");
});

let takeScreenshot = async () => {
  let tab = await chrome.tabs.query({ active: true, currentWindow: true });
  let tabId = tab[0].windowId;
  let screenshot = await chrome.tabs.captureVisibleTab(tabId, { format: "png" });
  // Open in new tab
  let newTab = await chrome.tabs.create({ url: screenshot, active: true });
}

chrome.action.onClicked.addListener((tab) => {
  takeScreenshot();
});
