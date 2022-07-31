export class Sessions {
    constructor() {
        this._sessionsButton = document.querySelector("#sessions-button");
        this._sessionsDropdown = document.querySelector("#sessions-dropdown");
        this._sessionLabel = document.querySelector("#sessions-button > .text");
        this._defaultSession = null;
        this._sessionsObject = [];
        this.init();
    }
    getDefaultSession() {
        return this._defaultSession;
    }
    updateSessionLabel() {
        if (!this._sessionLabel)
            return;
        this._sessionLabel.innerText = this._defaultSession?.name ?? "";
    }
    updateOnStartup() {
        if (!this._sessionsObject)
            return;
        const sessionKey = window.localStorage.getItem("defaultSession") ||
            this._sessionsObject[0].key ||
            window.lightdm?.default_session;
        this._defaultSession =
            this._sessionsObject.find((el) => el.key == sessionKey) ?? null;
        this.updateSessionLabel();
    }
    updateStorage(session) {
        if (!session)
            return;
        this._defaultSession = session;
        window.localStorage.setItem("defaultSession", this._defaultSession.key);
    }
    setSessionList() {
        if (!this._sessionsDropdown || !this._sessionsObject)
            return;
        this._sessionsDropdown.innerHTML = "";
        for (const v of this._sessionsObject) {
            const name = v.name;
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.innerText = name;
            button.addEventListener("click", () => {
                this.updateStorage(v);
                this.updateSessionLabel();
            });
            li.appendChild(button);
            this._sessionsDropdown.appendChild(li);
        }
    }
    setKeydown() {
        this._sessionsDropdown?.addEventListener("keydown", (ev) => {
            if (ev.keyCode == 27) {
                this._sessionsDropdown?.classList.add("hide");
                this._sessionsButton?.focus();
            }
        });
    }
    setButton() {
        document.querySelector("#screen")?.addEventListener("click", (ev) => {
            if (!this._sessionsDropdown)
                return;
            if (ev.target == this._sessionsButton ||
                ev.target.parentElement == this._sessionsButton) {
                this._sessionsDropdown.classList.toggle("hide");
            }
            else if (ev.target != this._sessionsDropdown &&
                ev.target.closest(".dropdown") == null) {
                this._sessionsDropdown.classList.add("hide");
            }
        });
        document.querySelector("#screen")?.addEventListener("focusin", () => {
            if (!this._sessionsDropdown)
                return;
            if (!this._sessionsDropdown.contains(document.activeElement) &&
                document.activeElement != this._sessionsButton) {
                this._sessionsDropdown.classList.add("hide");
            }
        });
    }
    init() {
        if (!window.lightdm)
            return;
        this._sessionsObject = window.lightdm.sessions;
        this.updateOnStartup();
        this.setSessionList();
        this.setButton();
        this.setKeydown();
    }
}
//# sourceMappingURL=sessions.js.map