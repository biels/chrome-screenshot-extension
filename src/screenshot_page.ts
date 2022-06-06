import MessageSender = chrome.runtime.MessageSender;

// Used for loading the screenshot when using manifest v3
chrome.runtime.onMessage.addListener((message: any, sender: MessageSender, sendResponse: Function) => {
    if (message.type == "screenshot") {
        let imgElement = document.getElementById('screenshot_img') as HTMLImageElement;
        imgElement.src = message.url;
    }
})
