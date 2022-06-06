let registerButton = () => {
    let el = document.createElement('div');
    let version = process.env.MANIFEST_VERSION;
    let getButtonId = (v = version) => `btn-screenshot-${v}`;
    el.id = getButtonId();
    el.innerHTML = `Take screenshot (${version})`;
    el.onclick = () => {
        chrome.runtime.sendMessage({type: "take-screenshot"}, response => {
            console.log(response.success);
        });
    }
    let s: CSSStyleDeclaration = el.style;
    let buttons = ['v2', 'v3'].map((v) => getButtonId(v)).map((id) => document.getElementById(id));
    let foundButtons = buttons.filter(a => a);
    let existingButtonHeight = foundButtons.reduce((acc, btn) => acc + (btn.getBoundingClientRect().height || 0), 0);
    s.position = 'fixed';
    s.top = `${8 + existingButtonHeight}px`;
    s.right = '8px';
    s.cursor = 'pointer';
    s.padding = '6px 8px';
    s.backgroundColor = version != 'v2' ? '#82DBD8' : '#B3E8E5';
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
