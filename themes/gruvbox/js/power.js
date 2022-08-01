export class Power {
    constructor() {
        this._shutdownButton = document.querySelector("#shutdown-btn");
        this._restartButton = document.querySelector("#restart-btn");
        this._suspendButton = document.querySelector("#suspend-btn");
        this._hibernateButton = document.querySelector("#hibernate-btn");
        this._cover = document.querySelector("#cover");
        this._coverMsg = document.querySelector("#cover > #message");
        this.init();
    }
    showMessage(text) {
        if (!this._coverMsg || !this._cover)
            return;
        this._coverMsg.innerHTML = text;
        this._cover.classList.remove("hide");
        window.wait(500).then(() => {
            this._cover?.focus();
        });
    }
    async doShutdown() {
        this.showMessage("Shutting down");
        await window.wait(1000);
        window.lightdm?.shutdown();
    }
    async doRestart() {
        this.showMessage("Restarting");
        await window.wait(1000);
        window.lightdm?.restart();
    }
    async doHibernate() {
        this.showMessage("Hibernating");
        await window.wait(1000);
        window.lightdm?.hibernate();
    }
    async doSuspend() {
        this.showMessage("Suspending");
        await window.wait(1000);
        window.lightdm?.suspend();
    }
    setShutdown() {
        if (!window.lightdm?.can_shutdown || !this._shutdownButton)
            return;
        this._shutdownButton.addEventListener("click", () => {
            this.doShutdown();
        });
        this._shutdownButton.classList.remove("hide");
    }
    setRestart() {
        if (!window.lightdm?.can_restart || !this._restartButton)
            return;
        this._restartButton.addEventListener("click", () => {
            this.doRestart();
        });
        this._restartButton.classList.remove("hide");
    }
    setHibernate() {
        if (!window.lightdm?.can_hibernate || !this._hibernateButton)
            return;
        this._hibernateButton.addEventListener("click", () => {
            this.doHibernate();
        });
        this._hibernateButton.classList.remove("hide");
    }
    setSuspend() {
        if (!window.lightdm?.can_suspend || !this._suspendButton)
            return;
        this._suspendButton.addEventListener("click", () => {
            this.doSuspend();
        });
        this._suspendButton.classList.remove("hide");
    }
    setCover() {
        if (!this._cover)
            return;
        this._cover.addEventListener("click", () => {
            this._cover?.classList.add("hide");
        });
        this._cover.addEventListener("keydown", () => {
            this._cover?.classList.add("hide");
        });
    }
    setButtons() {
        this.setShutdown();
        this.setRestart();
        this.setHibernate();
        this.setSuspend();
        this.setCover();
    }
    init() {
        this.setButtons();
    }
}
//# sourceMappingURL=power.js.map