import { Data } from "./data.js";
import { Backgrounds } from "./background.js";

declare global {
  interface Window {
    themeData: Data;
    backgrounds: Backgrounds;
  }
}

async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function _authenticationDone(): Promise<void> {
  await wait(500);
  const body = document.querySelector("body");
  if (body) body.style.opacity = "0";
}

function authenticationDone(): void {
  if (window.lightdm?.is_authenticated) _authenticationDone();
}

function initGreeter(): void {
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
