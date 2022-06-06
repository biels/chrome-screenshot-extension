# Chrome Screenshot Extension
This is an example extension that allows you to take a screenshot from your browser using a floating button visible in the top right corner of every page of the browser.

![example workflow](https://github.com/biels/chrome-screenshot-extension/actions/workflows/build.yml/badge.svg?branch=master)

## Installation

1. Download and extract the (v2 and/or v3) files that you find in the [latest realese](https://github.com/biels/chrome-screenshot-extension/releases/latest).
2. In your Chrome or Edge browser go to the [extensions page](chrome://extensions/).
3. Enable developer mode using the switch in the top right.
4. Click on the "Load unpacked" and select the downloaded folder.

## Features

* Capture a screenshot of the visible area of the current page.
* "Take screenshot" buttons are not shown in the taken screenshot.
* Versions for manifest v2 and v3 are available.

## Usage
Click on the button on the top right to take a screenshot. The screenshot will be opened in a new tab. If you have the v2 and v3 extensions installed, both buttons will be visible at the same time.

## How it works
### Screenshot taking
This extension uses the [chrome.tabs.captureVisibleTab](https://developer.chrome.com/docs/extensions/reference/tabs/#method-captureVisibleTab) method from the chrome API to take a screenshot of the visible part of the tab.
### Manifest v2 and v3 compatibility
The project is compiled using [webpack](https://webpack.js.org/) and we are using the [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/) to set the `MANIFEST_VERSION` environment variable to `v2` or `v3` during the build process. This value is used in the code to execute the needed logic to make the extension compatible with the specified version of the manifest. We then take advantage of webpack [tree shaking](https://webpack.js.org/guides/tree-shaking/#root) to only leave the code relevant to each version of the extension in the resulting artifacts.

## Possible improvements
* Use the `html2canvas` library to take full screenshots of the current page instead of the chrome API. It would allow us to take screenshots of the full page and not only the visible part.



## License
MIT

