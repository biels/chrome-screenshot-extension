// chrome.runtime.onInstalled.addListener(async () => {
//   let url = chrome.runtime.getURL("main.html");
// });

let takeScreenshot = async () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let current = tabs[0];
        chrome.tabs.captureVisibleTab(current.windowId, {format: "png"}, (dataUrl) => {
            console.log(`dataUrl`, dataUrl);
            let newTab = chrome.tabs.create({url: dataUrl, active: true});
        })
    });

}

if (process.env.MANIFEST_VERSION == 'v2') {
    chrome.browserAction.onClicked.addListener((tab) => {
        takeScreenshot();
    });
} else if (process.env.MANIFEST_VERSION == 'v3') {

}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      if (request.type == "take-screenshot") {
          takeScreenshot();
          sendResponse({success: true});
      }
  }
);
