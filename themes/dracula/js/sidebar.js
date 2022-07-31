export class Sidebar {
    constructor() {
        this._sidebar = document.querySelector("#sidebar");
        this._sidebarButton = document.querySelector("#panel-button");
        this._closeButton = document.querySelector("#close-panel-button");
        this._visible = false;
        this.init();
    }
    showSidebar() {
        this._sidebar?.classList.remove("hide");
        window.wait(100).then(() => {
            this._closeButton?.focus();
        });
        this._visible = true;
    }
    hideSidebar() {
        this._sidebar?.classList.add("hide");
        this._sidebarButton?.focus();
        this._visible = false;
    }
    toggleSidebar() {
        if (this._visible) {
            this.hideSidebar();
        }
        else {
            this.showSidebar();
        }
    }
    setKeydown() {
        this._sidebar?.addEventListener("keydown", (ev) => {
            if (ev.keyCode == 27) {
                this.hideSidebar();
            }
        });
    }
    setSidebar() {
        document.querySelector("#screen")?.addEventListener("click", (ev) => {
            if (ev.target == this._sidebarButton ||
                ev.target.parentElement == this._sidebarButton) {
                this.toggleSidebar();
            }
            else if (ev.target != this._sidebar &&
                ev.target.closest(".panel") == null) {
                this._sidebar?.classList.add("hide");
                this._visible = false;
            }
            if (ev.target == this._closeButton ||
                ev.target.parentElement == this._closeButton) {
                this.hideSidebar();
            }
        });
        document.querySelector("#screen")?.addEventListener("focusin", () => {
            if (!this._sidebar?.contains(document.activeElement)) {
                this._sidebar?.classList.add("hide");
                this._visible = false;
            }
        });
    }
    init() {
        this.setSidebar();
        this.setKeydown();
    }
}
//# sourceMappingURL=sidebar.js.map