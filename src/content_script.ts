let version = process.env.MANIFEST_VERSION;

let getButtonId = (v = version) => `btn-screenshot-${v}`;

let getRegisteredButtons = () => {
    let buttons = ['v2', 'v3'].map((v) => getButtonId(v)).map((id) => document.getElementById(id));
    return buttons;
}

let reorderButtons = () => {
    // Always v2 on top and v3 on bottom
    let buttons = getRegisteredButtons();
    let [v2, v3] = buttons
    if (v2 && v3) {
        v2.style.top = '8px';
        v3.style.top = `${8 + v2.getBoundingClientRect().height}px`;
    }
}
let setButtonsVisibility = (visible) => {
    let registeredButtons = getRegisteredButtons();
    registeredButtons.forEach(btn => {
        btn.style.display = visible ? 'block' : 'none';
    });
}

let registerButton = () => {
    let el = document.createElement('div');
    el.id = getButtonId();
    el.innerHTML = `Take screenshot (${version})`;
    el.onclick = () => {
        setButtonsVisibility(false);
        setTimeout(() => {
            chrome.runtime.sendMessage({type: "take-screenshot"}, response => {
                console.log(response.success);
                setButtonsVisibility(true);
            });
        }, 10)
    }
    let s: CSSStyleDeclaration = el.style;

    let foundButtons = getRegisteredButtons().filter(a => a);
    let existingButtonHeight = foundButtons.reduce((acc, btn) => acc + (btn.getBoundingClientRect().height || 0), 0);
    s.position = 'fixed';
    s.top = `${8 + existingButtonHeight}px`;
    s.right = '8px';
    s.cursor = 'pointer';
    s.padding = '6px 8px';
    s.backgroundColor = version != 'v2' ? '#82DBD8' : '#B3E8E5';
    s.color = 'black';
    s.fontSize = '16px';
    s.zIndex = '9999';
    s.fontFamily = 'sans-serif';
    // hover
    s.transition = 'all 0.2s ease-in-out';
    console.log(`version, el`, version, el);
    document.body.appendChild(el)
    reorderButtons();
}
registerButton();

// alert(`Hello from ${process.env.MANIFEST_VERSION}`);
console.log(`Hello from ${process.env.MANIFEST_VERSION}`);
if (process.env.MANIFEST_VERSION == 'v2') {
    console.log(`Hello2`);
} else if (process.env.MANIFEST_VERSION == 'v3') {
    console.log(`Hello3`);
}
