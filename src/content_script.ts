let el = document.createElement('div');
el.innerHTML = 'Take screenshot';
el.onclick = () => {
    console.log(`chrome.runtime`, chrome.runtime);
    chrome.runtime.sendMessage({type: "take-screenshot"}, function(response) {
        console.log(response.success);
    });
}
let s: CSSStyleDeclaration = el.style;
s.position = 'fixed';
s.top = '8px';
s.right = '8px';
s.cursor = 'pointer';
s.padding = '4px 8px';
s.backgroundColor = 'lightblue';
s.color = 'black';
s.fontSize = '16px';
s.zIndex = '99';
s.fontFamily = 'sans-serif';


console.log(`el`, el, document.body);
document.body.appendChild(el)
// alert(`Hello from ${process.env.MANIFEST_VERSION}`);
