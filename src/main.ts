// chrome.runtime.onInstalled.addListener(async () => {
//   let url = chrome.runtime.getURL("main.html");
// });

// Use Manifest V2
let takeScreenshot = async () => {
   chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
     let newTab = chrome.tabs.create({ url: dataUrl, active: true });
   })
}

chrome.browserAction.onClicked.addListener((tab) => {
  takeScreenshot();
});
