// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.
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

