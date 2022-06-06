let registerButton = () => {
    let el = document.createElement('div');
    el.id = `btn-screenshot-${process.env.MANIFEST_VERSION}`;
    el.innerHTML = `Take screenshot (${process.env.MANIFEST_VERSION})`;
    el.onclick = () => {
        chrome.runtime.sendMessage({type: "take-screenshot"}, response => {
            console.log(response.success);
        });
    }
    let s: CSSStyleDeclaration = el.style;
    let buttons = ['v2', 'v3'].map((v) => `btn-screenshot-${v}`).map((id) => document.getElementById(id));
    let foundButtons = buttons.filter(a => a);
    let existingButtonHeight = foundButtons.reduce((acc, btn) => acc + (btn.getBoundingClientRect().height || 0), 0);
    s.position = 'fixed';
    s.top = `${8 + existingButtonHeight}px`;
    s.right = '8px';
    s.cursor = 'pointer';
    s.padding = '4px 8px';
    s.backgroundColor = 'lightblue';
    s.color = 'black';
    s.fontSize = '16px';
    s.zIndex = '99';
    s.fontFamily = 'sans-serif';
    document.body.appendChild(el)
}
registerButton();

// alert(`Hello from ${process.env.MANIFEST_VERSION}`);
console.log(`Hello from ${process.env.MANIFEST_VERSION}`);
if(process.env.MANIFEST_VERSION == 'v2'){
    console.log(`Hello2`);
}else if(process.env.MANIFEST_VERSION == 'v3'){
    console.log(`Hello3`);
}
