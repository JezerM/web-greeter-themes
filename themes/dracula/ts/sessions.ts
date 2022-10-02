import { LightDMSession } from "../../../ts-types/ldm_interfaces";

export class Sessions {
  private _sessionsButton: HTMLButtonElement | null;
  private _sessionsDropdown: HTMLUListElement | null;
  private _sessionLabel: HTMLSpanElement | null;
  private _selectedSession: LightDMSession | null;
  private _sessionsObject: LightDMSession[];

  public constructor() {
    this._sessionsButton = document.querySelector("#sessions-button");
    this._sessionsDropdown = document.querySelector("#sessions-dropdown");
    this._sessionLabel = document.querySelector("#sessions-button > .text");
    this._selectedSession = null;
    this._sessionsObject = [];
    this.init();
  }

  public getSelectedSession(): LightDMSession | null {
    return this._selectedSession;
  }

  public updateSessionLabel(): void {
    if (!this._sessionLabel) return;
    this._sessionLabel.innerText = this._selectedSession?.name ?? "";
  }

  public updateOnStartup(): void {
    if (!this._sessionsObject) return;
    let sessionKey = window.accounts.getDefaultAccount()?.session;

    if (!sessionKey && this._sessionsObject.length > 0)
      sessionKey = this._sessionsObject[0].key;
    if (!sessionKey) sessionKey = window.lightdm?.default_session;

    this._selectedSession =
      this._sessionsObject.find((el) => el.key == sessionKey) ?? null;
    this.updateSessionLabel();
  }

  public setSessionList(): void {
    if (!this._sessionsDropdown || !this._sessionsObject) return;
    this._sessionsDropdown.innerHTML = "";
    for (const v of this._sessionsObject) {
      const name = v.name;
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.innerText = name;
      button.addEventListener("click", () => {
        this._selectedSession = v;
        this.updateSessionLabel();
      });

      li.appendChild(button);
      this._sessionsDropdown.appendChild(li);
    }
  }

  public setKeydown(): void {
    this._sessionsDropdown?.addEventListener("keydown", (ev) => {
      if (ev.keyCode == 27) {
        this._sessionsDropdown?.classList.add("hide");
        this._sessionsButton?.focus();
      }
    });
  }

  public setButton(): void {
    document.querySelector("#screen")?.addEventListener("click", (ev) => {
      if (!this._sessionsDropdown) return;
      if (
        ev.target == this._sessionsButton ||
        (ev.target as Element).parentElement == this._sessionsButton
      ) {
        this._sessionsDropdown.classList.toggle("hide");
      } else if (
        ev.target != this._sessionsDropdown &&
        (ev.target as Element).closest(".dropdown") == null
      ) {
        this._sessionsDropdown.classList.add("hide");
      }
    });
    document.querySelector("#screen")?.addEventListener("focusin", () => {
      if (!this._sessionsDropdown) return;
      if (
        !this._sessionsDropdown.contains(document.activeElement) &&
        document.activeElement != this._sessionsButton
      ) {
        this._sessionsDropdown.classList.add("hide");
      }
    });
  }

  public init(): void {
    if (!window.lightdm) return;
    this._sessionsObject = window.lightdm.sessions;
    this.updateOnStartup();
    this.setSessionList();
    this.setButton();
    this.setKeydown();
  }
}
