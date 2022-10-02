import { Data } from "./data.js";
import { Backgrounds } from "./background.js";
async function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
async function _authenticationDone() {
    await wait(500);
    const body = document.querySelector("body");
    if (body)
        body.style.opacity = "0";
}
function authenticationDone() {
    if (window.lightdm?.is_authenticated)
        _authenticationDone();
}
function initGreeter() {
    window.lightdm?.authentication_complete?.connect(() => authenticationDone());
    window.themeData = new Data();
    window.backgrounds = new Backgrounds();
    window.backgrounds.init();
}
if (window._ready_event === undefined) {
    window._ready_event = new Event("GreeterReady");
    window.dispatchEvent(window._ready_event);
}
window.addEventListener("GreeterReady", initGreeter);
//# sourceMappingURL=secondary.js.map