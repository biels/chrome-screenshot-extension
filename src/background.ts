// chrome.runtime.onInstalled.addListener(async () => {
//   let url = chrome.runtime.getURL("main.html");
// });


let genRandomString = (length: number) => {
    return Math.random().toString(36).substr(2, length);
}

let takeScreenshot = async () => {
    return new Promise(resolve => {
        chrome.tabs.captureVisibleTab(function(screenshotUrl) {
            let getURL = (process.env.MANIFEST_VERSION == 'v2' ? chrome.extension : chrome.runtime).getURL;
            let newTabUrl = getURL(`screenshot.html?s=${genRandomString(8)}`)
            let targetId = null;

            chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
                if (tabId != targetId || changedProps.status != "complete")
                    return;
                chrome.tabs.onUpdated.removeListener(listener);
                if (process.env.MANIFEST_VERSION == 'v2') {
                    let views = chrome.extension.getViews({type: 'tab', tabId: tabId});
                    for (let i = 0; i < views.length; i++) {
                        let view = views[i];
                        if (view.location.href == newTabUrl) {
                            let imgElement = view.document.getElementById('screenshot_img') as HTMLImageElement;
                            imgElement.src = screenshotUrl;
                            break;
                        }
                    }
                } else {
                    chrome.tabs.sendMessage(tabId, {type: 'screenshot', url: screenshotUrl});
                }

            });

            chrome.tabs.create({url: newTabUrl}, function(tab) {
                targetId = tab.id;
            });
        });
    });
}

if (process.env.MANIFEST_VERSION == 'v2') {
    chrome.browserAction.onClicked.addListener((tab) => {
        // chrome.management.uninstallSelf();
        takeScreenshot();
    });
} else if (process.env.MANIFEST_VERSION == 'v3') {

}

chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
      if (request.type == "take-screenshot") {
          await takeScreenshot();
          sendResponse({success: true});
      } else {
          sendResponse({});
      }
      return true;
  }
);
