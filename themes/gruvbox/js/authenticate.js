export class Authenticate {
    constructor() {
        this._inputPassword = document.querySelector("#input-password");
        this._form = document.querySelector("#pass-form > form");
        this._inputEye = document.querySelector("#pass-eye");
        this._password = "";
        this.init();
    }
    setForm() {
        this._form?.addEventListener("submit", (e) => {
            e.preventDefault();
            this._password = this._inputPassword?.value ?? "";
            this.doRespond();
        });
    }
    setAuthenticationDone() {
        window.lightdm?.authentication_complete.connect(() => {
            if (window.lightdm?.is_authenticated) {
                this._authenticationDone();
            }
            else {
                this._authenticationFailed();
            }
        });
    }
    setPasswordEye() {
        this._inputEye?.addEventListener("click", () => {
            if (!this._inputPassword)
                return;
            if (this._inputPassword?.type === "password") {
                this._inputPassword.type = "text";
            }
            else {
                this._inputPassword.type = "password";
            }
        });
    }
    doRespond() {
        if (!this._inputPassword)
            return;
        const user = window.accounts.getDefaultAccount();
        this._inputPassword.blur();
        this._inputPassword.disabled = true;
        if (user == window.accounts.guestUser &&
            window.lightdm?.has_guest_account) {
            window.lightdm.authenticate_as_guest();
        }
        else {
            window.lightdm?.respond(this._password);
        }
    }
    startAuthentication() {
        window.lightdm?.cancel_authentication();
        const user = window.accounts.getDefaultAccount();
        if (user == window.accounts.guestUser && window.lightdm?.has_guest_account)
            return;
        window.lightdm?.authenticate(user?.username ?? null);
    }
    async _authenticationDone() {
        const form = document.querySelector("#login-form");
        form?.classList.add("success");
        await window.wait(500);
        const defSession = window.sessions.getSelectedSession();
        const body = document.querySelector("body");
        if (body)
            body.style.opacity = "0";
        await window.wait(1000);
        console.log("Session started with", defSession?.key);
        window.lightdm?.start_session(defSession?.key ?? null);
    }
    async _authenticationFailed() {
        this.startAuthentication();
        document.querySelector("#login-form")?.classList.add("failed");
        if (this._inputPassword) {
            this._inputPassword.blur();
            this._inputPassword.value = "";
            this._inputPassword.disabled = false;
        }
        await window.wait(2000);
        document.querySelector("#login-form")?.classList.remove("failed");
    }
    init() {
        this.setForm();
        this.setAuthenticationDone();
        this.setPasswordEye();
        console.log("Start authentication");
        this.startAuthentication();
    }
}
//# sourceMappingURL=authenticate.js.map